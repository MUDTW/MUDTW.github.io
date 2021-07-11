// Require the net moudle for work with networking
const net = require('net');
const path = require('path');
const iconv = require('iconv-lite');
const moment = require('moment');
const ChineseNumber = require('chinese-numbers-converter');
const { TelnetSocket } = require('telnet-stream');
const { writeFileSync } = require('fs');


const file = process.argv[2] || "tw"
const muds = require(`../../static/data/muds-${file}.json`);
const data = [];

const getStatus = (mud) => {
  // create a Socket connection and decorate it as a TelnetSocket
  let info = { ...mud };
  const socket = net.createConnection(info['port'], info['address']);
  const tSocket = new TelnetSocket(socket);

  // setup the timeout for disconnection
  tSocket.setTimeout(20000);

  // store the data sent from server in content
  let content = '';
  tSocket.on('data', (buffer) => {
    const data = iconv.decode(buffer, info["encoding"]);

    if (data.match(RegExp('Are you using BIG5 font?'), 'i')) {
      tSocket.write('N\n');
    }

    if (data.match(RegExp('Please input gb or big5|请选择GB或是BIG5|Select GB or BIG5'), 'i')) {
      tSocket.write('gb\n');
    }

    if (data.match(RegExp('您是否是中小学学生或年龄更小？'), 'i')) {
      tSocket.write('no\n');
    }

    if (data.match(RegExp('您是否是中小学学生或年龄更小？'), 'i')) {
      tSocket.write('\n');
    }

    if (data.match(RegExp('请输入 ENTER 或 E 以继续'), 'i')) {
      tSocket.write('E\n');
    }

    if (data.match(RegExp('非移动客户端请按0回车或直接回车'), 'i')) {
      tSocket.write('0\n');
    }

    content = content + data;
  });

  // if the connection error, destroy the socket and return status
  tSocket.on('error', () => {
    info['status'] = false;
    tSocket.end();
    tSocket.destroy();
  });

  // if the socket closes, terminate the program
  tSocket.on('close', () => {
    // remove ASCII color code
    content = content.replace(/\u001b[^m]*?m/g, '');

    // writeFileSync(path.resolve(__dirname, './', `${info['en_name']}.txt`), data);

    if (info['regex'] !== false) {
      const match = content.match(RegExp(info['regex'], 'i'));
      count = match ? match[1] : 'NULL';

      if (info['convert']) {
        const num = new ChineseNumber(count).toInteger();
        count = String(num);
      }
    } else {
      count = 'NULL';
    }
    info['count'] = count;
    data.push(info);
  });

  tSocket.on('timeout', () => {
    info['status'] = true;
    info['update'] = moment().format('YYYY-MM-DD hh:mm');
    tSocket.end();
    tSocket.destroy();
  });
};

muds.forEach((item) => {
  getStatus(item);
});

process.on('exit', function () {
  // Do some cleanup such as close db
  data.sort();
  writeFileSync(
    path.resolve(__dirname, '../../static/data/', `muds-${file}.json`),
    JSON.stringify(data, null, 2),
    {
      encoding: 'utf8',
      flag: 'w',
    },
  );
});
