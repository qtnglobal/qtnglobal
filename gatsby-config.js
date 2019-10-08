module.exports = {
  siteMetadata: {
    title: `QTN Global`,
    description: `QTN Global`,
    author: `jason@qtnglobal.org`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {}
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/data/posts/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: []
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `QTN Global`,
        short_name: `QTN`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#cb2ba7`,
        display: `standalone`,
        icon: `${__dirname}/src/assets/images/qtnglobal.png`
      }
    },
    `gatsby-plugin-offline`
  ]
};
