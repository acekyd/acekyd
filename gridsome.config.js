// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

var embedConfig = {
  enabledProviders: [
    "Youtube",
    "Vimeo",
    "Gist",
    "Codepen",
    "JSFiddle",
    "Giphy",
    "CodeSandbox",
    "Twitter"
  ],
  Youtube: {
    template: "./src/embedTemplates/YouTube.hbs"
  },
  Vimeo: {
    template: "./src/embedTemplates/Vimeo.hbs"
  },
  Giphy: {
    template: "./src/embedTemplates/Giphy.hbs"
  },
  JSFiddle: {
    template: "./src/embedTemplates/JSFiddle.hbs",
    secureConnection: true
  },
  Codepen: {
    template: "./src/embedTemplates/Codepen.hbs"
  },
  Twitter: {
    align: "center",
    hideConversation: true
  }
};

module.exports = {
  siteName: "Adewale Abati",
  siteDescription:
    'Adewale "Ace" Abati is a Web Engineer, Developer Advocate, Open Sourcer and Youtuber.',

  templates: {
    Post: "/posts/:title",
    Tag: "/tag/:id"
  },

  plugins: [
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "content/posts/*.md",
        remark: {
          plugins: [
            ["@noxify/gridsome-plugin-remark-embed", embedConfig],
            "@gridsome/remark-prismjs"
          ]
        },
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: "Tag",
            create: true
          }
        }
      }
    },
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: "UA-105301496-1"
      }
    }
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
      plugins: ["@gridsome/remark-prismjs"]
    }
  }
};
