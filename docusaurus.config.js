// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Jye',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/color.svg',

  // Set the production url of your site here
  url: 'https://jye10032.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Frontend-Roadmap-with-Docusaurus/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Jye10032', // Usually your GitHub org/user name.
  projectName: 'docusaurus-website', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Jye',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '文档',
          },
          // { to: '/blog', label: '随笔', position: 'left' },
          {
            href: 'https://github.com/Jye10032',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          //   {
          //     title: 'Docs',
          //     items: [
          //       {
          //         label: 'Tutorial',
          //         to: '/docs/intro',
          //       },
          //     ],
          //   },
          //   {
          //     title: 'Community',
          //     items: [
          //       {
          //         label: 'Stack Overflow',
          //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //       },
          //       {
          //         label: 'Discord',
          //         href: 'https://discordapp.com/invite/docusaurus',
          //       },
          //       {
          //         label: 'Twitter',
          //         href: 'https://twitter.com/docusaurus',
          //       },
          //     ],
          //   },
          //   {
          //     title: 'More',
          //     items: [
          //       {
          //         label: 'Blog',
          //         to: '/blog',
          //       },
          //       {
          //         label: 'GitHub',
          //         href: 'https://github.com/facebook/docusaurus',
          //       },
          //     ],
          //   },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Jye's blog. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
