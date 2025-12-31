# codespaces-react

Welcome to your shiny new Codespace running React! We've got everything fired up and running for you to explore React.

You've got a blank canvas to work on from a git perspective as well. There's a single initial commit with the what you're seeing right now - where you go from here is up to you!

Everything you do here is contained within this one codespace. There is no repository on GitHub yet. If and when you’re ready you can click "Publish Branch" and we’ll create your repository and push up your project. If you were just exploring then and have no further need for this code then you can simply delete your codespace and it's gone forever.

This project was bootstrapped for you with [Vite](https://vitejs.dev/).

## Available Scripts

In the project directory, you can run:

### `npm start`

We've already run this for you in the `Codespaces: server` terminal window below. If you need to stop the server for any reason you can just run `npm start` again to bring it back online.

Runs the app in the development mode.\
Open [http://localhost:3000/](http://localhost:3000/) in the built-in Simple Browser (`Cmd/Ctrl + Shift + P > Simple Browser: Show`) to view your running application.

The page will reload automatically when you make changes.\
You may also see any lint errors in the console.

Start the frontend dev server:

```bash
npm install
npm run start
```

Run the simple backend (optional, for local API):

```bash
cd server
npm install
npm start
```

The frontend will call `/api/products` and `/api/orders` — if you run the dev backend above it will respond with sample data. If you don't run it, the frontend falls back to mock data in `src/api/index.js`.
# GitHub Codespaces ♥️ React

Welcome to your shiny new Codespace running React! We've got everything fired up and running for you to explore React.

You've got a blank canvas to work on from a git perspective as well. There's a single initial commit with the what you're seeing right now - where you go from here is up to you!

Everything you do here is contained within this one codespace. There is no repository on GitHub yet. If and when you’re ready you can click "Publish Branch" and we’ll create your repository and push up your project. If you were just exploring then and have no further need for this code then you can simply delete your codespace and it's gone forever.

This project was bootstrapped for you with [Vite](https://vitejs.dev/).

## Available Scripts

In the project directory, you can run:

### `npm start`

We've already run this for you in the `Codespaces: server` terminal window below. If you need to stop the server for any reason you can just run `npm start` again to bring it back online.

Runs the app in the development mode.\
Open [http://localhost:3000/](http://localhost:3000/) in the built-in Simple Browser (`Cmd/Ctrl + Shift + P > Simple Browser: Show`) to view your running application.

The page will reload automatically when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn Vitest, a Vite-native testing framework, go to [Vitest documentation](https://vitest.dev/guide/)

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://sambitsahoo.com/blog/vite-code-splitting-that-works.html](https://sambitsahoo.com/blog/vite-code-splitting-that-works.html)

### Analyzing the Bundle Size

This section has moved here: [https://github.com/btd/rollup-plugin-visualizer#rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer#rollup-plugin-visualizer)

### Making a Progressive Web App

This section has moved here: [https://dev.to/hamdankhan364/simplifying-progressive-web-app-pwa-development-with-vite-a-beginners-guide-38cf](https://dev.to/hamdankhan364/simplifying-progressive-web-app-pwa-development-with-vite-a-beginners-guide-38cf)

### Advanced Configuration

This section has moved here: [https://vitejs.dev/guide/build.html#advanced-base-options](https://vitejs.dev/guide/build.html#advanced-base-options)

### Deployment

This section has moved here: [https://vitejs.dev/guide/build.html](https://vitejs.dev/guide/build.html)

### Troubleshooting

This section has moved here: [https://vitejs.dev/guide/troubleshooting.html](https://vitejs.dev/guide/troubleshooting.html)

---

## Davetiye başvuruları için E-posta (VDS / Vercel)

- `vds` klasöründe basit bir Express + Nodemailer sunucusu bulunmaktadır (`vds/index.js`). Bu sunucu SMTP bilgilerini `.env` üzerinden alır ve `POST /send` ile gelen JSON verisini e-posta olarak gönderir.
- VDS örneğiniz için IP: `31.57.33.249`, port: `3002` kullanabilirsiniz (örnek VDS URL: `http://31.57.33.249:3002`).
- Alternatif olarak Next.js API route'u (`app/api/appointments/route.js`) gelen başvuruları VDS'ye iletecek şekilde güncellendi; eğer `VDS_URL` çevre değişkeni yoksa doğrudan SMTP (server-side) ile gönderim denenir.

Gerekli environment değişkenleri (Vercel'de Project > Settings > Environment Variables):

- `VDS_URL` (ör. `http://31.57.33.249:3002`) — isteği iletecek dış VDS (önerilen: VDS'ye yönlendirerek SMTP bağımlılığını Vercel'den uzak tutarsınız)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — SMTP bilgileri (VDS yoksa kullanılabilir; Vercel serverless fonksiyonlarıyla SMTP bağlantı limitleri olabilir)
- `MAIL_TO`, `MAIL_FROM` — e-postaların gönderileceği adres ve gönderici

Vercel'e özgü notlar:

1. Proje kökünde `vercel.json` eklendi. `app/api` içindeki route'lar için `nodejs18.x` runtime ve 30s `maxDuration` ayarlandı.
2. Tavsiye: Vercel'de production için **VDS_URL** ayarlayın (ör. `http://31.57.33.249:3002`) — bu, e-postaların doğrudan kendi VDS sunucunuz üzerinden gönderilmesini sağlar ve serverless SMTP limitlerini aşmanızı engeller.
3. Alternatif olarak doğrudan SMTP kullanacaksanız `env.example` dosyasını referans alarak Vercel dashboard'da Environment Variables olarak ekleyin.

> Not: Vercel serverless fonksiyonları kısa süreli (timeout) çalışır; büyük dosya gönderimi veya uzun SMTP el sıkışmaları için dış bir VDS (kalıcı Node süreci) kullanmanız daha güvenli olur.

