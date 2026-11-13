# Golden Ribbons Android download page

Single-page site for authorized staff. The download button serves `downloads/GoldenRibbons.apk` from this folder. It does not open the Expo build page.

Publish the **contents** of `download-site/` as the site root so `index.html` and `downloads/GoldenRibbons.apk` stay in the same place.

## Run locally

From this directory:

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

Python’s built-in server may not send the APK content type. Netlify and Cloudflare Pages read `_headers`. For nginx:

```nginx
location = /downloads/GoldenRibbons.apk {
  default_type application/vnd.android.package-archive;
  add_header Content-Disposition "attachment; filename=\"GoldenRibbons.apk\"";
}
```

The button also sets the download filename to `GoldenRibbons.apk`.

## Where the link is configured

`index.html`, on the download link:

```html
href="downloads/GoldenRibbons.apk"
download="GoldenRibbons.apk"
```

`script.js` only disables that button when the file is missing, or when the page is opened with `?apk=unavailable`.

The version line is in `index.html`:

```html
APK • v1.0.0 • For authorized staff
```

Leave the version off until a replacement APK’s `versionName` has been read from the file.

## Replace the APK

Do this only after the new build is verified. Do not point the button at an Expo build-details page, and do not drop in an older or unrelated file.

1. On the Expo build page, confirm the build status is finished and the artifact badge says APK, not AAB.
2. Use that build’s **Download build** action and save the file. Do not use the page URL itself as the website link. The public artifact link redirects to a signed address that expires in about 15 minutes.
3. Confirm the file is a zip APK (`PK` header), contains `AndroidManifest.xml` and `classes.dex`, and does not contain `BundleConfig.pb`.
4. Confirm the manifest package is `com.anonymous.goldenribbon` and note `versionName`.
5. Replace `downloads/GoldenRibbons.apk` with that file. Keep the filename.
6. Update `downloads/SHA256.txt` with the new size and SHA-256.
7. Update the version text in `index.html` only if step 4 produced a version. Otherwise use `APK • For authorized staff`.
8. Leave the `href` as `downloads/GoldenRibbons.apk`.

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

The Expo-hosted copy of this internal build is marked to expire on 27 November 2026. The copy in `downloads/` is the one this website serves.

## Deploy

Do not publish until that has been approved.

This APK is larger than several static hosts allow:

- GitHub rejects files over 100 MB, and this GitHub account has no remaining Git LFS budget. `GoldenRibbons.apk` is kept on disk and is not in the repository. After cloning, copy the verified APK to `download-site/downloads/GoldenRibbons.apk`. It also cannot be served from GitHub Pages.
- Cloudflare Pages limits a file to 25 MiB.
- A host must accept a file of about 112 MB and should send `Content-Type: application/vnd.android.package-archive` plus `Content-Disposition: attachment; filename="GoldenRibbons.apk"`.

Hosts that can store the file (an nginx server, object storage, or another static host with a high enough file limit) can serve this folder as-is. `_headers` covers Netlify and Cloudflare Pages headers, but those platforms still have to accept the file size.

If the chosen host cannot store the APK, do not invent another URL. Download a fresh verified APK and put it where the stable site path `/downloads/GoldenRibbons.apk` can reach it.
