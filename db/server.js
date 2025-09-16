// import jsonServer from "json-server";
// import auth from "json-server-auth";

// const server = jsonServer.create();   // بيرجع Express app
// const router = jsonServer.router("db.json"); // Router شغال مع الملف
// const middlewares = jsonServer.defaults();   // Middleware جاهزة

// server.db = router.db;  // بيربط auth بالـ DB

// server.use(middlewares);
// server.use(auth);       // هنا auth function بيتضاف كـ middleware
// server.use(router);

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
