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
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
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
        icon: `src/assets/images/qtnglobal.png`
      }
    },
    `gatsby-plugin-offline`
  ]
};
