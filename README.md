# Pixel Flags

A free set of **196 country (and a few extra) flags** drawn as crisp little pixel icons, **16 × 12 px**. Built for tight spaces — language switchers, leaderboards, address forms, data tables, status bars — anywhere a full-detail flag would turn to mush.

Every flag ships in three formats so you can drop it into a website, an app, or a design file without converting anything:

| Folder | Format | Size | Best for |
| --- | --- | --- | --- |
| [`svg/`](svg) | SVG (vector) | scales to any size | the web, retina, design tools |
| [`png/`](png) | PNG | 16 × 12 px | pixel-perfect 1× raster use |
| [`png-2x/`](png-2x) | PNG | 32 × 24 px | retina / high-DPI raster use |

![All flags organized by region](flags-by-region.png)

## Why pixel flags?

Real flags are full of fine detail — coats of arms, stars, crescents, fine stripes. Shrink one to 16 px and it smears into noise. These are hand-tuned to stay **legible at icon size**: each is a tidy little 16 × 12 composition that still reads as the right country at a glance, and the SVGs stay sharp at any scale.

## File naming

Files are named **`<code>-<name>.<ext>`**, lowercase and hyphenated — the code is the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code, so you can build a path straight from a code you already have:

```
svg/br-brazil.svg
png/kr-south-korea.png
png-2x/st-sao-tome-and-principe.png
```

A few entries fall outside ISO: the EU uses its reserved `eu`, England uses the subdivision code `gb-eng`, and Mars has no code (just `mars.svg`). See the [full list](#coverage) for every code.

## Usage

**HTML**

```html
<img src="svg/br-brazil.svg" width="16" height="12" alt="Brazil" />
```

**CSS background**

```css
.flag-brazil {
  width: 16px;
  height: 12px;
  background: url("svg/br-brazil.svg") no-repeat center / contain;
}
```

**Markdown**

```markdown
![Japan](png/jp-japan.png)
```

**React** — when you have an ISO code from your data:

```jsx
<img src={`/flags/svg/${code}-${slug}.svg`} width={16} height={12} alt={name} />
```

## Coverage

196 flags spanning every region, plus a handful of extras (the EU, England, Puerto Rico, Vatican City — and Mars, for fun). See [`flags-by-region.png`](flags-by-region.png) above for the full visual index.

<details>
<summary><strong>Full A–Z list (with codes)</strong></summary>

Afghanistan `af`, Albania `al`, Algeria `dz`, Andorra `ad`, Antigua and Barbuda `ag`, Argentina `ar`, Armenia `am`, Australia `au`, Austria `at`, Bahamas `bs`, Bahrain `bh`, Bangladesh `bd`, Barbados `bb`, Belarus `by`, Belgium `be`, Belize `bz`, Benin `bj`, Bhutan `bt`, Bolivia `bo`, Bosnia Herzegovina `ba`, Botswana `bw`, Brazil `br`, Brunei `bn`, Bulgaria `bg`, Burkina Faso `bf`, Burundi `bi`, Cambodia `kh`, Cameroon `cm`, Canada `ca`, Cape Verde `cv`, Central African Republic `cf`, Chad `td`, Chile `cl`, China `cn`, Colombia `co`, Comoros `km`, Congo `cg`, Costa Rica `cr`, Croatia `hr`, Cuba `cu`, Cyprus `cy`, Czechia `cz`, Denmark `dk`, Djibouti `dj`, Dominica `dm`, Dominican Republic `do`, DR Congo `cd`, East Timor `tl`, Ecuador `ec`, Egypt `eg`, El Salvador `sv`, England `gb-eng`, Equatorial Guinea `gq`, Eritrea `er`, Estonia `ee`, Eswatini `sz`, Ethiopia `et`, European Union `eu`, Fiji `fj`, Finland `fi`, France `fr`, Gabon `ga`, Gambia `gm`, Germany `de`, Ghana `gh`, Greece `gr`, Grenada `gd`, Guatemala `gt`, Guinea `gn`, Guinea Bissau `gw`, Guyana `gy`, Haiti `ht`, Honduras `hn`, Hungary `hu`, Iceland `is`, India `in`, Indonesia `id`, Iran `ir`, Iraq `iq`, Ireland `ie`, Israel `il`, Italy `it`, Ivory Coast `ci`, Jamaica `jm`, Japan `jp`, Jordan `jo`, Kazakhstan `kz`, Kenya `ke`, Kiribati `ki`, Kosovo `xk`, Kuwait `kw`, Kyrgyzstan `kg`, Laos `la`, Latvia `lv`, Lebanon `lb`, Lesotho `ls`, Liberia `lr`, Libya `ly`, Liechtenstein `li`, Lithuania `lt`, Luxembourg `lu`, Madagascar `mg`, Malawi `mw`, Maldives `mv`, Mali `ml`, Malta `mt`, Mars `—`, Marshall Islands `mh`, Mauritania `mr`, Mauritius `mu`, Mexico `mx`, Micronesia `fm`, Moldova `md`, Monaco `mc`, Mongolia `mn`, Montenegro `me`, Morocco `ma`, Mozambique `mz`, Myanmar `mm`, Namibia `na`, Nauru `nr`, Nepal `np`, Netherlands `nl`, New Zealand `nz`, Nicaragua `ni`, Niger `ne`, Nigeria `ng`, North Korea `kp`, North Macedonia `mk`, Norway `no`, Oman `om`, Pakistan `pk`, Palau `pw`, Palestine `ps`, Panama `pa`, Papua New Guinea `pg`, Paraguay `py`, Peru `pe`, Philippines `ph`, Poland `pl`, Portugal `pt`, Puerto Rico `pr`, Qatar `qa`, Romania `ro`, Russia `ru`, Rwanda `rw`, Saint Kitts and Nevis `kn`, Saint Lucia `lc`, Saint Vincent `vc`, Samoa `ws`, San Marino `sm`, Saudi Arabia `sa`, Senegal `sn`, Serbia `rs`, Seychelles `sc`, Sierra Leone `sl`, Singapore `sg`, Slovakia `sk`, Slovenia `si`, Solomon Islands `sb`, Somalia `so`, South Africa `za`, South Korea `kr`, South Sudan `ss`, Spain `es`, Sri Lanka `lk`, Sudan `sd`, Suriname `sr`, Sweden `se`, Switzerland `ch`, Syria `sy`, São Tomé and Príncipe `st`, Tajikistan `tj`, Tanzania `tz`, Thailand `th`, Togo `tg`, Tonga `to`, Trinidad and Tobago `tt`, Tunisia `tn`, Turkey `tr`, Turkmenistan `tm`, Tuvalu `tv`, Uganda `ug`, Ukraine `ua`, United Arab Emirates `ae`, United Kingdom `gb`, United States `us`, Uruguay `uy`, Uzbekistan `uz`, Vanuatu `vu`, Vatican City `va`, Venezuela `ve`, Vietnam `vn`, Yemen `ye`, Zambia `zm`, Zimbabwe `zw`

</details>

## Contributing

Spotted a flag that needs fixing, or want to add one that's missing? Open an issue or a pull request. Please keep new flags to the same **16 × 12 px** grid and provide all three formats (`svg`, `png`, `png-2x`) so the set stays consistent.

## License

[MIT](LICENSE) — free to use in personal and commercial projects, no attribution required (though it's always appreciated).

Flags are emblems of their respective nations and are reproduced here for identification purposes.
