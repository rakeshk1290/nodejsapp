const express = require('express')

const healthRoute = require('./health.route')

const docsRoute = require('./docs.route')

const authRoute = require('./auth.route')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/check',
    route: healthRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
]

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

// /* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router
