# Pixel Flags

A free set of **197 country (and a few extra) flags** drawn as crisp little pixel icons, **16 × 12 px**. Built for tight spaces — language switchers, leaderboards, address forms, data tables, status bars — anywhere a full-detail flag would turn to mush.

Every flag ships in three formats so you can drop it into a website, an app, or a design file without converting anything:

| Folder | Format | Size | Best for |
| --- | --- | --- | --- |
| [`svg/`](svg) | SVG (vector) | scales to any size | the web, retina, design tools |
| [`png/`](png) | PNG | 16 × 12 px | pixel-perfect 1× raster use |
| [`png-2x/`](png-2x) | PNG | 32 × 24 px | retina / high-DPI raster use |

![All flags organized by region](flags-by-region.png)

## Why pixel flags?

Real flags are full of fine detail — coats of arms, stars, crescents, fine stripes. Shrink one to 16 px and it smears into noise. These are hand-tuned to stay **legible at icon size**: each is a tidy little 16 × 12 composition that still reads as the right country at a glance, and the SVGs stay sharp at any scale.

## Usage

Files are named by country, exactly as listed below (e.g. `Brazil.svg`, `South Korea.png`).

**HTML**

```html
<img src="svg/Brazil.svg" width="16" height="12" alt="Brazil" />
```

**CSS background**

```css
.flag-brazil {
  width: 16px;
  height: 12px;
  background: url("svg/Brazil.svg") no-repeat center / contain;
}
```

**Markdown**

```markdown
![Japan](png/Japan.png)
```

**React**

```jsx
<img src={`/flags/svg/${country}.svg`} width={16} height={12} alt={country} />
```

> Tip: filenames contain spaces and a few accents (e.g. `São Tomé and Príncipe.svg`). When building a URL in code, wrap the name in `encodeURIComponent()`.

## Coverage

197 flags spanning every region, plus a handful of extras (the EU, England, Puerto Rico, Vatican City — and Mars, for fun). See [`flags-by-region.png`](flags-by-region.png) above for the full visual index.

<details>
<summary><strong>Full A–Z list</strong></summary>

Afghanistan, Albania, Algeria, Andora, Antigua and Barbuda, Argentina, Armenia, Australia, Austria, Bahamas, Bahrain, Bangladesh, Barbados, Belarus, Belgium, Belize, Benin, Bhutan, Bolivia, Bosnia-Herzegovina, Botswana, Brazil, Brunei, Bulgaria, Burkina Faso, Burundi, Cambodia, Cameroon, Canada, Cape Verde, Central African Republic, Chad, Chile, China, Columbia, Comoros, Congo, Costa Rica, Croatia, Cuba, Cyprus, Czech Republic - Czechia, DR of Congo, Denmark, Djibouti, Dominica, Dominican Republic, EU, East Timor, Ecuador, Egypt, El Salvador, England, Equatorial Guinea, Eritrea, Estonia, Eswatini (Swaziland), Ethiopia, Fiji, Finland, France, Gabon, Gambia, Germany, Ghana, Greece, Grenada, Guatemala, Guinea-Bissau, Guinea, Guyana, Haiti, Honduras, Hungary, Iceland, India, Indonesia, Iran, Iraq, Ireland, Israel, Italy, Ivory Coast, Jamaica, Japan, Jordan, Kazakhstan, Kenya, Kiribati, Kosovo, Kuwait, Kyrgyzstan, Laos, Latvia, Lebanon, Lesotho, Liberia, Libya, Liechtenstein, Lithuania, Luxembourg, Madagascar, Malawi, Maldives, Mali, Malta, Mars, Marshall Islands, Mauritania, Mauritius, Mexico, Micronesia, Moldova, Monaco, Mongolia, Montenegro, Morocco, Mozambique, Myanmar, Namibia, Nauru, Nepal, Netherlands, New Zealand, Nicaragua, Niger, Nigeria, North Korea, North Macedonia, Norway, Oman, Pakistan, Palau, Palestine, Panama, Papua New Guinea, Paraguay, Peru, Philippines, Poland, Portugal, Puerto Rico, Qatar, Romania, Russia, Rwanda, Saint Kitts and Nevis, Saint Lucia, Saint Vincent, Samoa, San Marino, Saudi Arabia, Senegal, Serbia, Seychelles, Sierra Leone, Singapore, Slovakia, Slovenia, Solomon Islands, Somalia, South Africa, South Korea, South Sudan, Spain, Sri Lanka, Sudan, Suriname, Sweden, Switzerland, Syria, São Tomé and Príncipe, Tajikistan, Tanzania, Thailand, Tobago, Togo, Tonga, Trinidad, Tunisia, Turkey, Turkmenistan, Tuvalu, UK United Kingdom, US United States, Uganda, Ukraine, United Arab Emirates, Uruguay, Uzbekistan, Vanuatu, Vatican City, Venezuela, Vietnam, Yemen, Zambia, Zimbabwe

</details>

## Contributing

Spotted a flag that needs fixing, or want to add one that's missing? Open an issue or a pull request. Please keep new flags to the same **16 × 12 px** grid and provide all three formats (`svg`, `png`, `png-2x`) so the set stays consistent.

## License

[MIT](LICENSE) — free to use in personal and commercial projects, no attribution required (though it's always appreciated).

Flags are emblems of their respective nations and are reproduced here for identification purposes.
