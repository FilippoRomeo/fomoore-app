# VPS Deployment Notes

Nginx serves the portfolio from:

`/var/www/fomoore-app/client/dist`

The live site is configured in:

`/etc/nginx/sites-enabled/default`

Current relevant nginx behavior:

- HTML entry points use `Cache-Control: no-cache`
- Fingerprinted JS/CSS/assets use `Cache-Control: public, max-age=31536000, immutable`
- Kid Apollo media assets use `Cache-Control: public, max-age=86400`
- gzip is enabled for text, CSS, JavaScript, JSON, XML, and SVG

Kid Apollo source lives in:

`/var/www/fomoore-app/client/projects-src/kid-apollo`

Kid Apollo static export lives in:

`/var/www/fomoore-app/client/public/projects/kid-apollo`

Final deployed output lives in:

`/var/www/fomoore-app/client/dist/projects/kid-apollo`

Archived old external copies:

`/var/www/_archive_kid-apollo-source`
`/var/www/_archive_kid-apollo-portfolio-build`
