// // // import {getRequestConfig} from 'next-intl/server';

// // // export default getRequestConfig(async ({locale}) => {
// // //   // Static for now, we'll change this later
// // //   // const locale = 'en';
// // //   const currentLocale = locale || 'en';

// // //   return {
// // //     locale,
// // //     messages: (await import(`./messages/${currentLocale}.json`)).default
// // //   };
// // // });

// // import { getRequestConfig } from 'next-intl/server';

// // export default getRequestConfig(async ({ locale }) => {
// //   const currentLocale = locale || 'en';

// //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/messages/${currentLocale}.json`);
// //   const messages = await res.json();

// //   return {
// //     locale: currentLocale,
// //     messages,
// //   };
// // });

// import { getRequestConfig } from 'next-intl/server';

// export default getRequestConfig(async ({ locale }) => {
//   const currentLocale = locale || 'en';

//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/messages/${currentLocale}.json`);
//   const messages = await res.json();

//   return {
//     locale: currentLocale,
//     messages,
//   };
// });