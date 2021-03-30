/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'MUD Taiwan',
  tagline: 'The tagline of my site',
  url: 'https://MUD-TW.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'MUD-tw',
  projectName: 'MUD-TW.github.io',
  themeConfig: {
    navbar: {
      title: 'MUD Taiwan',
      logo: {
        alt: 'MUD-tw Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'introduction/',
          activeBasePath: 'introduction',
          label: '網路泥巴',
          position: 'left',
        },
        {
          to: 'development/',
          activeBasePath: 'development',
          label: '開發指南',
          position: 'left',
        },
        {
          to: 'connection/',
          activeBasePath: 'connection',
          label: '連線工具',
          position: 'left',
        },
        {
          to: 'list/',
          activeBasePath: 'list',
          label: '泥巴列表',
          position: 'left',
        },
        // {
        //   to: 'blog',
        //   activeBasePath: 'blog',
        //   label: '文章分享',
        //   position: 'left',
        // },
        {
          href: 'https://github.com/MUD-TW/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MUD Taiwan, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          path: 'docs',
          routeBasePath: '/',
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
