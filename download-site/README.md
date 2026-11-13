# Golden Ribbons Android download page

Single-page site for authorized staff. The download button is a link to the verified APK. The APK file is not stored in this website.

The link is the Expo artifact address for build `57ea1a4e-bd7f-447e-b5a2-f0b8663b823a`. Opening it downloads the APK. It does not open the Expo build-details page.

## Run locally

From this directory:

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

## Where the link is configured

`index.html`, on the download link:

```html
href="https://expo.dev/artifacts/eas/o3ieydPWX7cA4tRdAt9ArNJ9-HzZePsT_IublEPZdDg.apk"
```

The version line is in `index.html`:

```html
APK • v1.0.0 • For authorized staff
```

Leave the version off until a replacement APK’s `versionName` has been read from the file.

The downloaded filename comes from Expo: `application-57ea1a4e-bd7f-447e-b5a2-f0b8663b823a.apk`.

## Replace the link

Do this only after the new build is verified. Do not point the button at an Expo build-details page.

1. On the Expo build page, confirm the build status is finished and the artifact badge says APK, not AAB.
2. Open the artifact menu and copy **Download build**. That address looks like `https://expo.dev/artifacts/eas/<id>.apk`. Do not copy the build-page address.
3. Confirm that address responds with the APK (`Content-Disposition: attachment`, size matches, file starts with `PK`).
4. Confirm the package is `com.anonymous.goldenribbon` and note `versionName`.
5. Replace the `href` in `index.html` with that artifact address.
6. Update `downloads/SHA256.txt` and the version text only after step 4.

Current verified file:

| Field | Value |
| --- | --- |
| Expo build | `57ea1a4e-bd7f-447e-b5a2-f0b8663b823a` |
| Status seen on the build page | Succeeded |
| Package | `com.anonymous.goldenribbon` |
| versionName | `1.0.0` |
| versionCode | `1` |
| Size | 111,587,890 bytes (106.4 MiB) |
| SHA-256 | `6d57411b8731c15e9cdd7e61fb533da10ff014397545b25ae696ee3ce6f45db5` |

The Expo-hosted copy of this internal build is marked to expire on 27 November 2026. Each click asks Expo for a fresh download address. That temporary address lasts about 15 minutes. The button itself keeps the same artifact link.

## Deploy

Publish the contents of `download-site/` as the site root. The APK does not need to be uploaded with the site.
