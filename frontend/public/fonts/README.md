# Proxima Nova (как в макете Figma)

В Figma используется **лицензионная Proxima Nova** (часто через **Adobe Fonts** или покупку у **Mark Simonson**). Сторонние npm-сборки **не** гарантируют те же глифы и метрики, что у официального шрифта.

Выберите **один** способ:

## 1. Adobe Fonts (рекомендуется, если проект уже на Adobe)

1. В [Adobe Fonts](https://fonts.adobe.com/) добавьте **Proxima Nova** в веб-проект.
2. Скопируйте **Kit ID** из кода подключения (фрагмент URL `https://use.typekit.net/XXXXX.css` — это `XXXXX`).
3. В `frontend/.env.local` задайте:

   ```env
   NEXT_PUBLIC_ADOBE_FONTS_KIT_ID=ваш_kit_id
   ```

4. Перезапустите `npm run dev`. Страница подключит тот же шрифт, что и в макете при активном Adobe Fonts.

## 2. Mark Simonson (self-host WOFF2)

1. Купите веб-версию: [Proxima Nova — Mark Simonson](https://www.marksimonson.com/fonts/view/proxima-nova).
2. Из архива положите в эту папку **`public/fonts/`** два файла **точно с такими именами**:

   - `ProximaNova-Regular.woff2` — вес 400  
   - `ProximaNova-Bold.woff2` — вес 700  

   (Если в архиве другие имена — переименуйте или поправьте пути в `app/fonts/proxima.ts`.)

3. **Не** задавайте `NEXT_PUBLIC_ADOBE_FONTS_KIT_ID`, чтобы использовались локальные файлы.
4. Пересоберите проект: `npm run build`.

## Если ничего не настроено

Временно подставится **Inter** (чтобы сборка и dev работали). В консоли при старте dev будет предупреждение — это не Proxima Nova из макета.
