(function () {
  'use strict';

  var METAS_URL = 'https://raw.githubusercontent.com/FNTDUG/characters.json/refs/heads/main/metas.json';
  var UNITS_URL = 'https://raw.githubusercontent.com/FNTDUG/characters.json/refs/heads/main/json';

  if (!document.getElementById('metaGFonts')) {
    var lnk = document.createElement('link');
    lnk.id = 'metaGFonts'; lnk.rel = 'stylesheet';
    lnk.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    (document.head || document.documentElement).appendChild(lnk);
  }

  if (!document.querySelector('meta[name="viewport"]')) {
    var vpm = document.createElement('meta');
    vpm.name = 'viewport'; vpm.content = 'width=device-width, initial-scale=1';
    (document.head || document.documentElement).appendChild(vpm);
  }

  if (!document.getElementById('metaCSS')) {
    var CSS = [
      '@keyframes metaShiny{0%{background-position:0% 50%}100%{background-position:200% 50%}}',

      '.metaRoot{width:100vw;position:relative;left:50%;transform:translateX(-50%);' +
        'background-size:cover;background-position:center;background-repeat:no-repeat;' +
        'color:#fff;font-family:"Press Start 2P",monospace;box-sizing:border-box;' +
        'padding:clamp(14px,2.5vw,28px) clamp(8px,1.5vw,16px) clamp(18px,3vw,36px);' +
        'border:1px solid rgba(246,155,85,1);margin-bottom:15px}',
      '.metaRoot *{box-sizing:border-box}',
      '.metaTitle{font-family:"Press Start 2P",monospace;font-size:clamp(18px,3vw,36px);' +
        'color:#fff;text-align:center;margin:0 0 clamp(8px,1.5vw,16px);padding:4px 8px;' +
        'line-height:1.35;word-break:break-word;' +
        'text-shadow:0 2px 10px rgba(0,0,0,0.95),0 0 2px rgba(0,0,0,1)}',
      '.metaControls{display:flex;justify-content:flex-end;margin-bottom:6px}',
      '.metaRow{--mg:clamp(4px,1.2vw,10px);display:flex;justify-content:center;' +
        'flex-wrap:nowrap;gap:var(--mg);padding:4px 0}',
      '.metaFooter{display:flex;flex-direction:column;align-items:center;' +
        'gap:clamp(6px,1vw,10px);margin-top:clamp(10px,2vw,26px)}',
      '.metaLogo{width:clamp(56px,7vw,88px);height:clamp(56px,7vw,88px);' +
        'border-radius:50%;object-fit:cover;display:block}',
      '.metaSiteUrl{font-family:"Press Start 2P",monospace;font-size:clamp(11px,1.5vw,18px);' +
        'color:#fff;text-align:center;text-shadow:0 1px 6px rgba(0,0,0,0.95)}',

      /* seamless — ~30% smaller than the original values */
      '.seamlessRoot{width:100vw;position:relative;left:50%;transform:translateX(-50%);' +
        'background-size:cover;background-position:center;background-repeat:no-repeat;' +
        'color:#fff;font-family:"Press Start 2P",monospace;box-sizing:border-box;' +
        'padding:clamp(8px,1.4vw,17px) 0 clamp(10px,1.75vw,20px);' +
        'border:1px solid rgba(246,155,85,1);margin-bottom:5px;overflow:hidden}',
      '.seamlessRoot *{box-sizing:border-box}',
      '.seamlessHeader{display:flex;align-items:center;justify-content:center;' +
        'gap:clamp(6px,1vw,14px);' +
        'padding:0 clamp(6px,1.05vw,11px);margin-bottom:3px;' +
        'min-height:clamp(32px,4.9vw,56px)}',
      '.seamlessLogo{flex-shrink:0;' +
        'width:clamp(38px,5.8vw,70px);height:clamp(38px,5.8vw,70px);' +
        'border-radius:50%;object-fit:cover}',
      '.seamlessSiteName{font-family:"Press Start 2P",monospace;' +
        'font-size:clamp(16px,3.5vw,48px);color:#fff;line-height:1.2;text-align:center;' +
        'text-shadow:0 2px 10px rgba(0,0,0,0.95)}',
      '.seamlessSiteUrl{font-family:"Press Start 2P",monospace;' +
        'font-size:clamp(7px,1.1vw,13px);color:#fff;text-align:center;' +
        'padding:0 clamp(6px,1.05vw,11px);' +
        'margin-bottom:clamp(4px,0.7vw,8px);text-shadow:0 1px 4px rgba(0,0,0,0.9)}',
      '.seamlessSection{padding:0 clamp(6px,1.05vw,11px);margin-top:clamp(2px,0.3vw,4px)}',
      '.seamlessSectionTitle{font-family:"Press Start 2P",monospace;' +
        'font-size:clamp(10px,1.82vw,24px);color:#f69b55;text-align:center;' +
        'margin:0 0 clamp(3px,0.56vw,7px);' +
        'text-shadow:0 2px 10px rgba(0,0,0,0.95),0 0 2px rgba(0,0,0,1)}',
      '.seamlessControls{display:flex;justify-content:center;' +
        'padding:clamp(3px,0.56vw,6px) clamp(6px,1.05vw,11px) clamp(4px,0.7vw,7px)}',
      '.seamlessControls .meta-clutter-btn{font-size:clamp(5px,0.7vw,8px);' +
        'padding:clamp(3px,0.42vw,6px) clamp(6px,0.84vw,11px)}',

      /* page switcher tabs — only rendered when pages.length > 1 */
      '.seamlessPageTabBar{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;' +
        'padding:clamp(3px,0.5vw,6px) clamp(6px,1.05vw,11px) clamp(5px,0.8vw,9px)}',
      '.seamlessPageTab{font-family:"Press Start 2P",monospace;font-size:clamp(5px,0.8vw,9px);' +
        'padding:clamp(3px,0.5vw,6px) clamp(7px,1vw,12px);' +
        'background:rgba(0,0,0,0.5);border:1px solid rgba(246,155,85,0.35);' +
        'color:rgba(255,255,255,0.4);border-radius:4px;cursor:pointer;' +
        'transition:all .15s;user-select:none}',
      '.seamlessPageTab:hover{background:rgba(246,155,85,0.1);border-color:rgba(246,155,85,0.7);color:rgba(255,255,255,0.8)}',
      '.seamlessPageTab.seamlessPageTabActive{background:rgba(246,155,85,0.18);border-color:rgba(246,155,85,1);color:#ffa45b}',

      '.meta-card{width:100%;aspect-ratio:1/1;' +
        'border-radius:12px;padding:3px;position:relative;cursor:pointer}',
      '.meta-card.meta-shiny{background-size:200% 200%;animation:metaShiny 6s linear infinite}',
      '.meta-card-inner{position:relative;width:100%;height:100%;' +
        'border-radius:9px;overflow:hidden;background:rgba(14,11,28,0.88)}',
      '.meta-byte-inner,.meta-chip-inner,.meta-path-inner,.meta-replacement-inner,.mt-icon-in{position:relative}',
      '.meta-card-inner::after,.meta-byte-inner::after,.meta-chip-inner::after,.meta-path-inner::after,.meta-replacement-inner::after,.mt-icon-in::after{content:"";position:absolute;inset:0;border-radius:inherit;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAMJElEQVR4AezYh5LjyBEE0NmT9176UpmQ/V55L53MmXo8JraIxZAAB5wd0xHIqWpTLqvR4O4Hd3d3v3nC+HXl9qvCLws/L/ys8NPCTwo/nsGcNXt+UWts2PLxZGvUgMr1vT6fVPTgo9L/V/iw8I/CXwt/Lvyx8Icjfl/yd4XI6MYd9rPlgy8++RYj8chy9f6e99UAhcPHVTpC/lvyn4W/FZCGcEAiILbL6H2eDlkjO/jjWwyxxBRbDnKBCv+4z2M3QJGgcAT8q8pFyJ9KIguBQU52l/Tf1l7yHPjo631MF0tDvB29GXKDCvE4z2M1QFFOGuJdBa6Ev1SJSEAGdD0kkXPYmzk6ovvYnPGSNDeH5stFTnKTo1zlXCne9rl1AxQBilKc0+4a6GQjBGFBJ7TPZT4ya93eWkf23CfZgnVSM+QoVznLHW7WhVs2QOJO0n8q+78XnDIFIj9QNBhHRs+YDVvE8OPKANdXhzmwx142bLs/PoM+Tw/YOCT8aIQa1FIl7P/cqgES9ovDa60YxaXwuXT6AmsIcDez/XeV7Fvx/5JOJDKA/yVYA3vZsOVDY/iUixggJhn0HOlgvzzUIl6lse9ziwYgQNFOoQIQOofiOuxTKDvF8rFnwXzxybdTLZY3RA4aQII8I+nyIjVPbhq7awf2bIAinTivruIk3qEwUDDQ7VOY04qgXYs740wsMcVGrlzyRtA71GBMapwa1XrG/fqlvRqgoH7XOzkg6TnMa5L9uxWyvuS7u7vTzXJAKnLltpSveYeF9GbLXc2nnq4YPbQBkpdITpIEYV5ETpDTJnl2V6R7UxM5aQSC5S/nIGNSfepQsyuJ3dWJPaQBAiPfLxFJSyqnRJJJlrTm7mVzdbKPZChHuaYmtagryFhNmoADNleld20DBBQY+RKRnMTmMO8XiJNyVYLv0UjOriU1OESpzZhOQurDyeZ0tzZAEOjkpwGSAcmBE+Qk2b85sSdiIHdXpm+WmtTXoXZwEDXM/k2pb20A5wIJKDAkIQmCsYT95LP/JUAteRvUF6g/wAluNjVhawM4d6qdbhB8LiXiDXkJxPca1KQ2NXeoP8CNfd3urL6lARwL4HT3BPppyEfpbNBnvIgDNab+XvtVTVjbACffTzSvoUCaQAbGmmPfM+Z3VepqVGtqn0tc4Mq+iw7XNsC/Gn3tBROAhJwEp8LpuBjwhWxAbpqAA1wAbsBBxdnFctc0ALHuPk45n0MiEroY7IVtULPa8dLJx485nPkony37UgMSxOnnFAQAQQXRoLNBPlt8kX/VjgN8BDgCYw3C4b3Fn2sAQz+/EiBOOQbzErjX+StZwAEucIIjoDu05nGIy0U67msAA47d7RwCpyRwzvGi01c46b7HCY7cDDgKNAGXOH2HmvsaYKMvOWOOI+kc+9ehPQNvGcAXfubAnbW3O5u21ACd8vFwf8UZ0gPz9jQ3Qy0GcOLG6JxFN+8tsae2vn3ua4CO6dwSOHrrYWidAQcX2Yjv3JnD6cUG2OC+csq7Azqn4+rpdC/rOMIVzgD5JE41CMeT5dIb4ONqM0NgDPQT48nLUDoDOMJfOIs0h1vr0/7eAAs6pIPIhhiTjCfDoZxlwHXT+aMDbt0wuD446A0wkQbols0kQ3IysnHgIgM4C3d0wOnJN7Q3AMFOuY0MgQ7mL0YcG04YwNmHNdN5DJe4rqW7uzTAhFfDq6NLkQzA+sFg/FnNAM5wCTgEOm5xbX1qAK+un2yKZKCT1ge2M4DsziU+jadrqL8BiGZgU4dubQ89LDCAu3CJ20ADvAGfLDUgmxjSOeFsYDsDSHawcRngFA68pgEGNs7hWtoedlh0Bpz2Oa/GOJ++AYg2qTMd5ruzoW9nANHhFMfBgdu8Abq0BK/Q9pDDojOAw3Ab8jM+vAHZYNECCXRr3dnQtzOAQ1ziFKKT00fY6wAmA+Pt4YbFEgOuIbziNJJ+aIBFg75AN7/kbMxtZwCXOA7wC4cGeEWy0KX57aGegsXTywGXCAcca8gBPsJ9gg4WGT29Up5nRrjEKeAX6B9rQBbn8nmW+jSzxi0gnYSDngZME5X/YaGkuRLj2YmB8EoCfqdvwGFQgbqs4Xh2ZKBzO+neADFMdEkf2J+B8MzzQU8DTAy8BwbSgDfH2HN5nB5iJwbCL3f0NxpAmSZKybjU8ezIQHglg8P/BRmkEXN9x/iv3hWOO3A9vQEGfZH+6hnbkQD8Al5JOOj+fK4CQXQSbKqltc/Yd4YBXOIUcA30D/zJYiZJMH/G51jawAAucRrgnT414PPlLLBAt6mmx7MDA7jEKW47pm9AJm0KzO0Qe7goBtIA3OKVhKkBBsEXygCMvTo1HM8DGMAhLgGvQNeIQwP4NpEFesDY+sD1DOAQn53f6Id/B3CdDRa+WBOBLtVwPA9gwPUz59UY51MDdMkk4slgNOABzB9NET3nFb8ac9IAm4IvlTEYHzbWeDzbGXCwcYjLwBisTd8AA52abzIeDdhOfCxwh2w8kkDHNc6nN4CB68YGsOnLNUl6XUodzxIDF+ZwGR5xCeY04GCqQxTdoNvAALpu3b6BbQzgcAm4PnBKiUsTTvuc/K/UBl0rMZ4NDOASd/jsMI/rg6t5A7waOsYwYGxuMjpYjj+XGMAbhEfS+N4GcKghyLY5+GotAMNSx7OCATcGziA8krjF8eTiZHCcRbROMQjiaLwFR5LOCBzhLZzRAadumBPTeQMY+zVkMyNOgq+VpQ6WGM8ZBnAUzrrEJ25xPJnPG5CF/gp1J3ROsm/IUwZwg2g8dZhzs5yQz3SpATZx5C1w6uHrtZkEju2pqfE0BnCCaByFr0jzOLWnmdyd/EPsZKEGeQs4RDpnYOw1qy3jaQzgCzfhiMQbLJ5+tktvgPk39ceazsUph0Gc1rbxFAMInvOUMa4WT3/ZnX0DNGHJ8TfKEDRHk2r4yM/TCocDXDiceCED5OMQl4tZM15cOE4ydN3EYQJ8s9a/VRDgko/a9mIftSMfH4AfCF++ozi8lwAO7l08Lnh9EM1xkADGEjgb5OjnpQk1IxgH0Dkxxhnuzta9pgEc+AeEALoceAPAWCISsvc1QK1uBkSHAzxEx5Wr5yIXaxsgoK88x4IKFkmH19IEXKhVzSGcDjjBEa7s260BHHHYA3+7JiUA0V1Ha5ta5s/uUZsaU3PqNgZNwJF9q4pbvfHoTRMkoNOCQQKTsOruO/p7TgJXak/Nao1O4mQT+YrnlFwLDWCDZAk4AfCdcgB08Bt41R1Yds/hUYurRY2gxgAPoGYfXRytrgmZqzcfNwog0Pw0JCFSkk6ED5X9R9NnJ+SuBrWoC5AdSXf6HUic2L+pyGsaIIBAAuq6JBAuKRK+W5vAnJPjV1RNPasn9akhNUUnQe04sBcnmwu8tgECCche9yUiIYnOYd4pcT+yYfuUIUenXs5yTz1dN2es9qvJRwICyRVY3CJZPpArIYkF3oDvlRXQQVGrf6KV7WM/7nrXjVyh526c2tT6YPIVhzzyoeAHsQhOkl1KHlKQIu3XwIfG3sO+E58c5dtriK7G3XJH3B4F8IFMhbjzJasAxSzh+2Vg3tXlY+4bwb6mH+URy9UhttMsFzkBfQ61qGn3g7NnA8JcCkOu4iTfoThjMrBPca4yzZAXkuLzoZIvPvkWI4ck8SPlNQfi1aJZantoLif2kjqZ2GmgYG8DUpGbAnPCSPhBxeswhwCvuV8XyOIHcYqXL9/nYI+9bNjywRefyJSLOJdgn/1qcOXwW+nu+9zE6TFFJPGPAEUoBrkKmwMZ5sgOc2w0EYFOLvgAOpEd5qyBvU4tWz6AX80mA/NzsBFPznLXTLUcy9pXIGhfj6feJA6KUIyiFBgCEALGZPDDckMng4wjzdPnyDwJ1iMTJ2NrgUbITfM01hsk90rlds+tG5DMFSKWotKI/kYg5hIQNd9jrqOvm+/jriO7Iyfe7385ylXOyf9mUqCbOV9wrCjwRrhX3c2uCmSEIMRBTmmX9DX4UcXmA+yPjG4sJuLlgHg54UN+Zf44j4CPE+ndKAoVX+Ga4Q7XDG/GvBkIM0feh75Oh+ylI5xvV4xYc9Ll826WN55BwI1DXHSvcJAL+OWCHCQhC2nIQyLkFEeG5IztCdjy4cPs6uNbw8ULziZ468VPAQAA//9hb7D5AAAABklEQVQDAJ1/YhYF+sEOAAAAAElFTkSuQmCC) 0 0/100% 100% no-repeat;pointer-events:none;z-index:1}',
      '.meta-card-img{width:100%;height:100%;object-fit:cover;object-position:center top;' +
        'display:block;pointer-events:none}',
      '.meta-byte{position:absolute;top:2px;right:2px;z-index:2;aspect-ratio:1/1;' +
        'width:clamp(16px,28%,54px);border-radius:9px;padding:2px;pointer-events:none}',
      '.meta-byte.meta-shiny{background-size:200% 200%;animation:metaShiny 6s linear infinite}',
      '.meta-byte-inner{width:100%;height:100%;border-radius:7px;overflow:hidden;background:rgba(14,11,28,0.88)}',
      '.meta-byte-inner img{width:100%;height:100%;object-fit:cover;display:block}',
      '.meta-byte-pair .meta-byte-inner{position:relative;overflow:hidden}',
      '.meta-byte-pair .meta-byte-inner img{position:absolute;left:50%;top:50%;' +
        'width:64%!important;height:64%!important;object-fit:contain}',
      '.meta-byte-pair .meta-byte-inner img.byte-b{transform:translate(-30%,-30%);opacity:.7}',
      '.meta-byte-pair .meta-byte-inner img.byte-a{transform:translate(-70%,-70%);' +
        'filter:drop-shadow(1px 1px 0 rgba(0,0,0,.95))}',
      '.meta-chip{position:absolute;bottom:2px;left:2px;z-index:2;aspect-ratio:1/1;' +
        'width:clamp(16px,28%,54px);border-radius:9px;padding:2px;pointer-events:none}',
      '.meta-chip.meta-shiny{background-size:200% 200%;animation:metaShiny 6s linear infinite}',
      '.meta-chip-inner{width:100%;height:100%;border-radius:7px;overflow:hidden;background:rgba(14,11,28,0.88)}',
      '.meta-chip-inner img{width:100%;height:100%;object-fit:cover;display:block}',
      '.meta-chip.chip-mid-right{bottom:auto;left:auto;right:2px;top:50%;transform:translateY(-50%)}',
      '.meta-chip.chip-bottom-right{left:auto;right:2px}',
      '.meta-enchant{position:absolute;top:2px;left:2px;z-index:2;aspect-ratio:1/1;' +
        'width:clamp(14px,24%,48px);border-radius:8px;padding:2px;pointer-events:none}',
      '.meta-enchant-inner{width:100%;height:100%;border-radius:6px;overflow:hidden;background:rgba(14,11,28,0.88)}',
      '.meta-enchant-inner img{width:100%;height:100%;object-fit:cover;display:block}',
      '.meta-path{position:absolute;z-index:2;aspect-ratio:1/1;' +
        'width:clamp(16px,28%,54px);border-radius:9px;padding:2px;pointer-events:none}',
      '.meta-path.path-tl{top:2px;left:2px}',
      '.meta-path.path-tr{top:2px;right:2px}',
      '.meta-path.path-bl{bottom:2px;left:2px}',
      '.meta-path.path-br{bottom:2px;right:2px}',
      '.meta-path.path-ml{left:2px;top:50%;transform:translateY(-50%)}',
      '.meta-path.meta-shiny{background-size:200% 200%;animation:metaShiny 6s linear infinite}',
      '.meta-path-inner{width:100%;height:100%;border-radius:7px;overflow:hidden;background:rgba(14,11,28,0.88)}',
      '.meta-path-inner img{width:100%;height:100%;object-fit:cover;display:block}',
      '.meta-path-pair .meta-path-inner{position:relative;overflow:hidden}',
      '.meta-path-pair .meta-path-inner img{position:absolute;left:50%;top:50%;' +
        'width:64%!important;height:64%!important;object-fit:contain}',
      '.meta-path-pair .meta-path-inner img.path-b{transform:translate(-30%,-30%);opacity:.7}',
      '.meta-path-pair .meta-path-inner img.path-a{transform:translate(-70%,-70%);' +
        'filter:drop-shadow(1px 1px 0 rgba(0,0,0,.95))}',
      '.meta-replacement{position:absolute;bottom:2px;right:2px;z-index:2;aspect-ratio:1/1;' +
        'width:clamp(16px,28%,54px);border-radius:9px;padding:2px;pointer-events:none}',
      '.meta-replacement.meta-shiny{background-size:200% 200%;animation:metaShiny 6s linear infinite}',
      '.meta-replacement-inner{width:100%;height:100%;border-radius:7px;overflow:hidden;background:rgba(14,11,28,0.88)}',
      '.meta-replacement-inner img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}',
      '.meta-label{position:absolute;bottom:2px;left:2px;padding:2px;' +
        'border-radius:5px;pointer-events:none;z-index:2}',
      '.meta-label-inner{background:rgba(0,0,0,0.88);color:#39ff14;' +
        'font-family:"Press Start 2P",monospace;' +
        'font-size:clamp(8px,2.2vw,9px);padding:3px 6px;border-radius:3px;display:block}',
      '.meta-slot{flex:0 1 calc((100% - 5 * var(--mg)) / 6);min-width:0;' +
        'display:flex;flex-direction:column;align-items:center;gap:clamp(3px,0.6vw,7px)}',
      '.meta-caption{font-family:"Press Start 2P",monospace;font-size:clamp(8px,2.3vw,10px);' +
        'color:#fff;text-align:center;width:100%;line-height:1.5;' +
        'word-break:break-word;text-shadow:0 1px 4px rgba(0,0,0,0.9);user-select:none}',

      '.metaControls{display:flex;justify-content:flex-end;margin-bottom:6px}',
      '.meta-clutter-btn{font-family:"Press Start 2P",monospace;font-size:7px;' +
        'padding:4px 8px;background:rgba(0,0,0,0.65);' +
        'border:1px solid rgba(246,155,85,0.75);color:#ffa45b;' +
        'border-radius:4px;cursor:pointer;user-select:none;transition:opacity .15s,border-color .15s,color .15s}',
      '.meta-clutter-btn:hover{background:rgba(246,155,85,0.12)}',
      '.meta-clutter-btn.cltr-off{border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.3)}',

      /* camera button — shares the clutter button's frame so the controls row stays even */
      '.meta-cam-btn{display:inline-flex;align-items:center;justify-content:center;' +
        'padding:4px 8px;background:rgba(0,0,0,0.65);' +
        'border:1px solid rgba(246,155,85,0.75);color:#ffa45b;' +
        'border-radius:4px;cursor:pointer;user-select:none;transition:opacity .15s,border-color .15s,color .15s}',
      '.meta-cam-btn:hover{background:rgba(246,155,85,0.12)}',
      '.meta-cam-btn[disabled]{opacity:.5;cursor:default}',
      '.meta-cam-btn svg{display:block;width:11px;height:11px}',
      '.metaControls{gap:6px}',
      '.seamlessControls .meta-cam-btn{padding:clamp(3px,0.42vw,6px) clamp(6px,0.84vw,11px)}',
      '.seamlessControls .meta-cam-btn svg{width:clamp(8px,1.1vw,12px);height:clamp(8px,1.1vw,12px)}',
      '.seamlessControls{gap:clamp(4px,0.7vw,8px)}',

      '.meta-shot-overlay{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,0.86);' +
        'display:flex;flex-direction:column;align-items:center;justify-content:center;' +
        'gap:16px;padding:20px;box-sizing:border-box}',
      '.meta-shot-overlay img{max-width:92vw;max-height:66vh;border-radius:10px;' +
        'box-shadow:0 10px 34px rgba(0,0,0,0.75)}',
      '.meta-shot-actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}',
      '.meta-shot-btn{font-family:"Press Start 2P",monospace;font-size:11px;padding:12px 18px;' +
        'border-radius:10px;cursor:pointer;border:2px solid;transition:background .12s,color .12s,border-color .12s}',
      '.meta-shot-save{background:#2a1f3a;border-color:#ffc84d;color:#ffc84d}',
      '.meta-shot-save:hover{background:#3a2a4a;color:#fff}',
      '.meta-shot-close{background:rgba(30,30,40,0.9);border-color:rgba(255,255,255,0.25);color:#ccc}',
      '.meta-shot-close:hover{color:#fff;border-color:rgba(255,255,255,0.5)}',
      '@media(max-width:600px){.meta-shot-btn{font-size:9px;padding:10px 14px}}',

      '.meta-clutter-off .meta-byte,' +
      '.meta-clutter-off .meta-chip,' +
      '.meta-clutter-off .meta-path,' +
      '.meta-clutter-off .meta-enchant,' +
      '.meta-clutter-off .meta-replacement,' +
      '.meta-clutter-off .meta-label{display:none!important}',

      '#metaTip{position:fixed;pointer-events:none;opacity:0;transition:opacity .18s;' +
        'z-index:10000;display:none;padding:2px;border-radius:8px}',
      '#metaTipInner{font-family:"Press Start 2P",monospace;font-size:10px;line-height:1.8;' +
        'background:rgba(6,3,18,0.97);color:#fff;padding:14px 18px;border-radius:8px;' +
        'text-align:left;max-width:300px;word-break:normal;overflow-wrap:break-word}',
      '.mt-name{font-size:13px;color:#fff;text-align:center;display:block;margin-bottom:6px}',
      '.mt-sep{border:none;border-top:1px solid rgba(255,255,255,0.18);margin:7px 0}',
      '.mt-row{display:flex;align-items:center;gap:9px;margin-top:7px}',
      '.mt-icon{width:36px;height:36px;border-radius:6px;padding:2px;flex-shrink:0}',
      '.mt-icon.meta-shiny{background-size:200% 200%;animation:metaShiny 6s linear infinite}',
      '.mt-icon-in{width:100%;height:100%;border-radius:4px;overflow:hidden;background:rgba(14,11,28,0.88)}',
      '.mt-icon-in img{width:100%;height:100%;object-fit:cover;display:block}',
      '.mt-icon-in.mt-icon-pair{position:relative;overflow:hidden}',
      '.mt-icon-in.mt-icon-pair img{position:absolute;left:50%;top:50%;' +
        'width:64%;height:64%;object-fit:contain}',
      '.mt-icon-in.mt-icon-pair img.path-b{transform:translate(-30%,-30%);opacity:.7}',
      '.mt-icon-in.mt-icon-pair img.path-a{transform:translate(-70%,-70%);' +
        'filter:drop-shadow(1px 1px 0 rgba(0,0,0,.95))}',
      '.mt-text{font-size:9.5px;opacity:0.9;line-height:1.5;white-space:pre-line}',

      '@media(min-width:901px){' +
        '.seamlessRoot{padding:clamp(5px,0.9vw,11px) 0 clamp(6px,1.12vw,13px)}' +
        '.seamlessHeader{gap:clamp(4px,0.64vw,9px);padding:0 clamp(4px,0.67vw,7px);min-height:clamp(21px,3.12vw,36px);margin-bottom:1px}' +
        '.seamlessLogo{width:clamp(24px,3.68vw,45px);height:clamp(24px,3.68vw,45px)}' +
        '.seamlessSiteName{font-size:clamp(10px,2.24vw,30px)}' +
        '.seamlessSiteUrl{font-size:clamp(5px,0.7vw,8px);padding:0 clamp(4px,0.67vw,7px);margin-bottom:clamp(2px,0.45vw,5px)}' +
        '.seamlessSection{padding:0 clamp(8px,1.5vw,16px);margin-top:2px}' +
        '.seamlessSectionTitle{font-size:clamp(6px,1.17vw,15px);margin:0 0 clamp(2px,0.36vw,5px)}' +
        '.seamlessControls{padding:clamp(2px,0.36vw,4px) clamp(4px,0.67vw,7px) clamp(2px,0.45vw,5px)}' +
        '.seamlessControls .meta-clutter-btn{font-size:clamp(5px,0.7vw,8px);padding:clamp(3px,0.42vw,6px) clamp(6px,0.84vw,11px)}' +
        '.seamlessPageTabBar{gap:5px;padding:clamp(3px,0.5vw,6px) clamp(6px,1.05vw,11px) clamp(5px,0.8vw,9px)}' +
        '.seamlessPageTab{font-size:clamp(5px,0.8vw,9px);padding:clamp(3px,0.5vw,6px) clamp(7px,1vw,12px)}' +
      '}',
      '@media(max-width:900px){' +
        '.metaRoot{padding-left:4px;padding-right:4px}' +
        '.metaRow{--mg:3px}' +
        '.seamlessSection .metaRow{--mg:3px}' +
        '.seamlessControls .meta-clutter-btn{font-size:7px;padding:4px 8px}' +
        '.seamlessHeader{min-height:clamp(30px,5vw,46px);margin-bottom:2px}' +
        '.seamlessLogo{width:clamp(30px,5vw,46px);height:clamp(30px,5vw,46px)}' +
        '.seamlessSiteName{font-size:clamp(20px,4.5vw,42px)}' +
        '.seamlessSiteUrl{margin-bottom:3px}' +
        '.meta-card{padding:2px;border-radius:8px}' +
        '.meta-card-inner{border-radius:6px}' +
        '.meta-byte{top:2px;right:2px;padding:1px;border-radius:6px}' +
        '.meta-byte-inner{border-radius:5px}' +
        '.meta-chip{bottom:2px;left:2px;padding:1px;border-radius:6px}' +
        '.meta-chip-inner{border-radius:5px}' +
        '.meta-enchant{top:2px;left:2px;padding:1px;border-radius:6px}' +
        '.meta-enchant-inner{border-radius:5px}' +
        '.meta-path{padding:1px;border-radius:6px}' +
        '.meta-path-inner{border-radius:5px}' +
        '.meta-replacement{bottom:2px;right:2px;padding:1px;border-radius:6px}' +
        '.meta-replacement-inner{border-radius:5px}' +
        '.meta-label{bottom:2px;left:2px;padding:1px}' +
        '.meta-label-inner{border-radius:2px}' +
      '}',
      '@media(max-width:640px){' +
        '.metaRow{flex-wrap:wrap;--mg:6px}' +
        '.meta-slot{flex:0 0 calc((100% - 2 * var(--mg)) / 3)}' +
        '.meta-clutter-btn,.seamlessControls .meta-clutter-btn{font-size:9px;padding:7px 11px}' +
        '.meta-cam-btn,.seamlessControls .meta-cam-btn{padding:7px 11px}' +
        '.meta-cam-btn svg,.seamlessControls .meta-cam-btn svg{width:13px;height:13px}' +
        '.metaControls,.seamlessControls{gap:7px}' +
        '.seamlessPageTab{font-size:7px;padding:6px 9px}' +
        '.seamlessSectionTitle{font-size:13px}' +
      '}',
      '@media(max-width:600px){' +
        '#metaTipInner{font-size:7px;padding:7px 9px;max-width:190px}' +
        '.mt-name{font-size:8px;margin-bottom:4px}' +
        '.mt-sep{margin:4px 0}' +
        '.mt-row{gap:5px;margin-top:4px}' +
        '.mt-icon{width:20px;height:20px}' +
        '.mt-text{font-size:6px}' +
        '.meta-label-inner{padding:3px 5px}' +
      '}'
    ].join('');

    var styleEl = document.createElement('style');
    styleEl.id = 'metaCSS';
    styleEl.textContent = CSS;
    (document.head || document.documentElement).appendChild(styleEl);
  }

  var tip, tipInner;
  if (!document.getElementById('metaTip')) {
    tip = document.createElement('div'); tip.id = 'metaTip';
    tipInner = document.createElement('div'); tipInner.id = 'metaTipInner';
    tip.appendChild(tipInner);
    document.body.appendChild(tip);
  } else {
    tip = document.getElementById('metaTip');
    tipInner = document.getElementById('metaTipInner');
  }

  var RARITY = {
    uncommon:  'linear-gradient(180deg,#3FFF8E,#5CFF4E)',
    rare:      'linear-gradient(180deg,#2244B0,#57A4FE)',
    epic:      'linear-gradient(180deg,#8A01A1,#FD34FE)',
    mythic:    'linear-gradient(180deg,#FFF006,#FFD114)',
    exclusive: 'linear-gradient(180deg,#8CFFCB 0%,#14735B 25.1%,#33E7FF 50%,#154A76 74.6%,#4FA4FF 100%)',
    secret:    'linear-gradient(180deg,#FF8700,#FF0F0C)',
    nightmare: 'linear-gradient(180deg,#492590,#2A1E42)',
    apex:      'linear-gradient(180deg,#9D0078,#0063F8)',
    hero:      'linear-gradient(180deg,#FFCD19 0%,#353815 50%,#FFFB85 100%)',
    radiant:   'linear-gradient(180deg,#FF6600,#FFCC33)'
  };
  var SHINY = {
    'Astral Bonnie':           'linear-gradient(90deg,#ffeb3b,#ff9800,#f44336,#9c27b0,#2196f3,#4caf50,#ffeb3b)',
    'Frozen King Foxy':        'linear-gradient(90deg,#ff85a2,#ffc107,#e91e63,#9c27b0,#ff85a2)',
    'Dragon Endo 01':          'linear-gradient(90deg,#4a00e0,#6e25ff,#1e0066,#6e25ff,#4a00e0)',
    'Kronos Endo Freddy':      'linear-gradient(90deg,#00ffff,#17a2b8,#000,#17a2b8,#00ffff)',
    'Headless Horseman Mangle':'linear-gradient(90deg,#50f2d0,#42a2f8,#1c734d,#8b5cf6,#000,#1c734d,#50f2d0)',
    'Hacker King RWQFSFASXC':  'linear-gradient(90deg,#000,#ff3131,#000,#ff3131,#000)',
    'Scooped Michael':         'linear-gradient(90deg,#a020f0,#6a0dad,#000,#bf00ff,#7d26cd)',
    'Yeti Oni Bonnie':         'linear-gradient(90deg,#5bb9ff,#fff,#2b70d9,#000,#2b70d9,#5bb9ff)',
    'Plushtrap':               'linear-gradient(90deg,#000,#555,#aaa,#555,#000)',
    'Turkey Chica':            'linear-gradient(90deg,#000,#ff3131,#000,#ff3131,#000)'
  };
  var SHINY_DEF = 'linear-gradient(90deg,red,orange,yellow,lime,cyan,blue,magenta,red)';

  var PATH_IMG = 'https://images.fntduserguide.com/';

  function metaPathInfo(unitCfg, u) {
    var raw = unitCfg && unitCfg.path;
    if (!raw || !u || !Array.isArray(u.paths) || !u.paths.length) return null;
    var tiers = String(raw).split('-').map(function (n) { return parseInt(n, 10) || 0; });
    var slug = String(unitCfg.name).toLowerCase().split(' ').join('-');

    function leg(i) {
      var tier = tiers[i] || 0;
      if (tier < 1) return null;
      var path = u.paths[i];
      if (!path || !Array.isArray(path.tiers) || !path.tiers[tier - 1]) return null;
      var icon = path.tiers[tier - 1].icon;
      if (!icon) return null;
      return { url: PATH_IMG + slug + '-paths/' + icon, pathNo: i + 1, tier: tier };
    }

    var taken = [];
    for (var i = 0; i < tiers.length; i++) {
      var l = leg(i);
      if (l) taken.push(l);
    }
    if (!taken.length) return null;
    taken.sort(function (a, b) { return b.tier - a.tier || a.pathNo - b.pathNo; });

    return {
      primary: taken[0],
      secondary: taken[1] || null,
      build: tiers.join('-')
    };
  }

  function metaBytes(unitCfg, META_CFG) {
    var raw = unitCfg && unitCfg.byte;
    var names = Array.isArray(raw) ? raw : String(raw || '').split(/\s*[,+/&]\s*/);
    var out = [], seen = {};
    names.forEach(function (n) {
      n = String(n || '').trim();
      if (!n || seen[n] || !META_CFG.bytes[n]) return;
      seen[n] = 1;
      out.push({ name: n, data: META_CFG.bytes[n] });
    });
    return out;
  }

  function metaGradStops(css) {
    return String(css || '').match(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g) || [];
  }

  function metaByteBg(bytes) {
    var a = bytes[0], b = bytes[1];
    var ra = (a.data.rarity || '').toLowerCase();
    var bgA = getRarityBg(a.name, ra);
    if (!b) return bgA;
    var rb = (b.data.rarity || '').toLowerCase();
    if (ra === rb || ra === 'shiny' || rb === 'shiny') return bgA;
    var sa = metaGradStops(bgA), sb = metaGradStops(getRarityBg(b.name, rb));
    if (!sa.length || !sb.length) return bgA;
    var stops = [];
    sa.forEach(function (c, i) { stops.push(c + ' ' + Math.round(sa.length > 1 ? i / (sa.length - 1) * 42 : 0) + '%'); });
    sb.forEach(function (c, i) { stops.push(c + ' ' + Math.round(58 + (sb.length > 1 ? i / (sb.length - 1) * 42 : 42)) + '%'); });
    return 'linear-gradient(135deg,' + stops.join(',') + ')';
  }

  function metaPathCorner(unitCfg, META_CFG) {
    var hasEnch = !!META_CFG.enchants[unitCfg.enchant];
    var hasByte = metaBytes(unitCfg, META_CFG).length > 0;
    var hasChip = !!(unitCfg.chip && META_CFG.chips && META_CFG.chips[unitCfg.chip]);
    var hasLabel = !!unitCfg.label;
    var hasRepl = !!unitCfg.replacement;

    var used = {};
    if (hasEnch) used.tl = 1;
    if (hasByte) used.tr = 1;
    if (hasLabel) used.bl = 1;
    if (hasRepl) used.br = 1;
    if (hasChip) {
      if (hasLabel) { if (!hasRepl) used.br = 1; }
      else used.bl = 1;
    }

    var order = ['br', 'bl', 'tl', 'tr'];
    for (var i = 0; i < order.length; i++) {
      if (!used[order[i]]) return 'path-' + order[i];
    }
    return 'path-ml';
  }

  var RARITY_FILL = {
    uncommon:'#103316',
    rare:'#0C172B',
    epic:'#27052A',
    mythic:'#332D03',
    exclusive:'#0A2E33',
    secret:'#330F01',
    nightmare:'#0C0715',
    apex:'#100A25',
    hero:'#0B0B04',
    radiant:'#331F05'
};
  function getRarityFill(rar) { return RARITY_FILL[rar] || ''; }
  function metaFillForBg(bg) { for (var k in RARITY) { if (RARITY[k] === bg) return RARITY_FILL[k] || ''; } return ''; }

  function getRarityBg(name, rar) {
    if (rar === 'shiny') return SHINY[name] || SHINY_DEF;
    return RARITY[rar] || '#888888';
  }

  var unitMap = {};
  var unitMapReady = false;

  function showTip(card, unitCfg, u, META_CFG) {
    var rar = (u.rarity || '').toLowerCase(), sh = rar === 'shiny';
    tip.style.background     = getRarityBg(unitCfg.name, rar);
    tip.style.backgroundSize = sh ? '200% 200%' : '';
    tip.style.animation      = sh ? 'metaShiny 6s linear infinite' : '';
    tipInner.innerHTML = '';

    var nameEl = document.createElement('span');
    nameEl.className = 'mt-name'; nameEl.textContent = unitCfg.name;
    tipInner.appendChild(nameEl);
    var sep = document.createElement('hr'); sep.className = 'mt-sep';
    tipInner.appendChild(sep);

    function tipRow(iconBg, iconSh, iconSrc, label) {
      var row = document.createElement('div'); row.className = 'mt-row';
      var ic  = document.createElement('div');
      ic.className = 'mt-icon' + (iconSh ? ' meta-shiny' : '');
      ic.style.background = iconBg;
      if (iconSh) ic.style.backgroundSize = '200% 200%';
      var inn = document.createElement('div'); inn.className = 'mt-icon-in'; inn.style.background = metaFillForBg(iconBg);
      if (Array.isArray(iconSrc)) {
        inn.className += ' mt-icon-pair';
        iconSrc.forEach(function (pr) {
          var pim = document.createElement('img');
          pim.className = pr[0]; pim.src = pr[1]; pim.alt = '';
          inn.appendChild(pim);
        });
      } else {
        var im = document.createElement('img'); im.src = iconSrc; im.alt = '';
        inn.appendChild(im);
      }
      ic.appendChild(inn);
      var tx = document.createElement('div'); tx.className = 'mt-text'; tx.textContent = label;
      row.appendChild(ic); row.appendChild(tx);
      return row;
    }

    metaBytes(unitCfg, META_CFG).forEach(function (b) {
      var bR = (b.data.rarity || '').toLowerCase();
      tipInner.appendChild(tipRow(getRarityBg(b.name, bR), bR === 'shiny', b.data.url, 'Byte: ' + b.name + (b.data.note ? '\n' + b.data.note : '')));
    });
    var chipData = META_CFG.chips && META_CFG.chips[unitCfg.chip];
    if (chipData) {
      var chR = (chipData.rarity || '').toLowerCase();
      tipInner.appendChild(tipRow(getRarityBg(unitCfg.chip, chR), chR === 'shiny', chipData.url, 'Chip: ' + unitCfg.chip + (chipData.note ? '\n' + chipData.note : '')));
    }
    var enchData = META_CFG.enchants[unitCfg.enchant];
    if (enchData) {
      tipInner.appendChild(tipRow(enchData.color, false, enchData.url, 'Enchant: ' + unitCfg.enchant));
    }
    var pathInfo = metaPathInfo(unitCfg, u);
    if (pathInfo) {
      tipInner.appendChild(tipRow(getRarityBg(unitCfg.name, rar), sh,
        pathInfo.secondary
          ? [['path-b', pathInfo.secondary.url], ['path-a', pathInfo.primary.url]]
          : pathInfo.primary.url,
        'Hero Tree: ' + pathInfo.build));
    }
    var role = u.role || u.type || '';
    if (role) {
      var rRow = document.createElement('div'); rRow.className = 'mt-row';
      var rTx = document.createElement('div'); rTx.className = 'mt-text'; rTx.textContent = 'Role: ' + role;
      rRow.appendChild(rTx); tipInner.appendChild(rRow);
    }
    if (unitCfg.replacement) {
      var rrU = unitMap[unitCfg.replacement] || {};
      var rrR = (rrU.rarity || '').toLowerCase();
      tipInner.appendChild(tipRow(getRarityBg(unitCfg.replacement, rrR), rrR === 'shiny', rrU.img || '', 'Alt: ' + unitCfg.replacement));
    }

    tip.style.display = 'block'; tip.style.opacity = '0';
    var r = card.getBoundingClientRect();
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var left = Math.max(4, Math.min(r.left + r.width / 2 - tw / 2, window.innerWidth - tw - 4));
    var top  = r.bottom + 6;
    if (top + th > window.innerHeight - 4) top = r.top - th - 6;
    // Flipping above a card high on the screen puts a tall tooltip off the top
    // of a phone, where it is simply invisible. Clamped into view instead —
    // overlapping the card reads better than not appearing at all.
    top = Math.max(4, Math.min(top, window.innerHeight - th - 4));
    tip.style.left = left + 'px'; tip.style.top = top + 'px'; tip.style.opacity = '1';
  }

  function hideTip() { tip.style.opacity = '0'; tip.style.display = 'none'; }

  /* Delegated, and deliberately the same shape as the reward tooltips on the
     story and challenges pages, which do not suffer this on mobile.

     A tap synthesises a whole mouse sequence after it — over, out, move, down,
     up, click — and any of those can land on the wrong element. Rather than try
     to suppress them, the click is allowed to re-show: it is the last event a
     tap delivers, so whatever closed the tooltip mid-sequence, the tap still
     ends on the right one being open.

     mouseout only closes when the pointer has genuinely left the card it is
     showing for — moving into that card's own children does not count, and nor
     does the stray out from the card you came from, because by then _tipCur is
     already the new one. */
  var _tipCur = null;
  function _tipCardOf(t) { return t && t.closest ? t.closest('.meta-card') : null; }
  /* One tap reaches this three ways — mouseover, the card's own click and the
     delegated one — and showTip restarts its fade every call, which read as a
     flicker. Asking for the tooltip that is already up is a no-op. */
  function tipShowFor(c) {
    if (!c || typeof c._metaShowTip !== 'function') return;
    if (_tipCur === c && tip.style.display === 'block') return;
    _tipCur = c;
    c._metaShowTip();
  }
  document.addEventListener('mouseover', function (ev) {
    tipShowFor(_tipCardOf(ev.target));
  });
  document.addEventListener('mouseout', function (ev) {
    if (!_tipCur) return;
    // Only the card actually showing may close it. A tap fires an out on the
    // card you came from too, and honouring that closed the one just opened —
    // relatedTarget alone does not catch it, since it is often null on iOS.
    if (!_tipCur.contains(ev.target)) return;
    if (ev.relatedTarget && _tipCur.contains(ev.relatedTarget)) return;
    _tipCur = null; hideTip();
  });
  document.addEventListener('click', function (ev) {
    var c = _tipCardOf(ev.target);
    if (c) { tipShowFor(c); return; }
    _tipCur = null; hideTip();
  }, true);
  // On window rather than document-in-capture: a page scroll should dismiss it,
  // but the jitter a tap produces inside a scrolling panel should not.
  window.addEventListener('scroll', function () { _tipCur = null; hideTip(); }, { passive: true });

  /* ── Capture ──────────────────────────────────────────────────────────────
     Same behaviour as the trade calculator's screenshot button. html2canvas is
     pulled in on first click rather than up front, so a page that never uses
     the button never pays for the library.
     Unit renders come from the fntd2-units R2 bucket, which must send CORS
     headers or html2canvas cannot read them and the cards render blank.        */
  var _h2cState = 0;   // 0 = untouched, 1 = loading, 2 = ready, 3 = failed
  var _h2cWaiting = [];
  function withHtml2Canvas(cb) {
    if (typeof window.html2canvas === 'function') { cb(true); return; }
    if (_h2cState === 3) { cb(false); return; }
    _h2cWaiting.push(cb);
    if (_h2cState === 1) return;
    _h2cState = 1;
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    s.onload = function () {
      _h2cState = typeof window.html2canvas === 'function' ? 2 : 3;
      var q = _h2cWaiting; _h2cWaiting = [];
      q.forEach(function (f) { f(_h2cState === 2); });
    };
    s.onerror = function () {
      _h2cState = 3;
      var q = _h2cWaiting; _h2cWaiting = [];
      q.forEach(function (f) { f(false); });
    };
    (document.head || document.documentElement).appendChild(s);
  }

  /* Point an <img> at a url in CORS mode. html2canvas re-requests every image
     with crossOrigin set; if the first load was plain, the browser reuses that
     cached non-CORS copy, the check fails, and the image is dropped from the
     capture — instantly, with no network round trip. Setting crossOrigin on the
     original load is what makes the cached copy usable. Must precede .src.     */
  function _metaImgSrc(im, url) {
    im.crossOrigin = 'anonymous';
    im.src = url || '';
    im.addEventListener('error', function () {
      // CORS unavailable for this one — retry plain so the page still shows it
      // (it just will not make it into a capture).
      if (im.getAttribute('crossorigin')) {
        var s = im.getAttribute('src');
        im.removeAttribute('crossorigin');
        im.src = s;
      }
    });
  }

  /* Same problem for CSS background-image, which has no crossOrigin attribute:
     warm the cache with a CORS fetch first, then apply it. */
  function _metaSetBg(el, url) {
    if (!url) return;
    var pre = new Image();
    pre.crossOrigin = 'anonymous';
    var apply = function () { el.style.backgroundImage = 'url(' + url + ')'; };
    pre.onload = apply;
    pre.onerror = apply;   // show it regardless; only the capture suffers
    pre.src = url;
  }

  /* Every URL the capture needs: <img> sources plus CSS background-image urls
     (the root's artwork, rarity plates, and so on, which have no crossOrigin
     attribute to set). */
  function _metaImageUrls(rootEl) {
    var urls = {};
    Array.prototype.forEach.call(rootEl.querySelectorAll('img'), function (im) {
      var s = im.getAttribute('src');
      if (s && s.indexOf('data:') !== 0) urls[s] = 1;
    });
    var els = [rootEl].concat(Array.prototype.slice.call(rootEl.querySelectorAll('*')));
    els.forEach(function (el) {
      var bg;
      try { bg = window.getComputedStyle(el).backgroundImage; } catch (e) { return; }
      if (!bg || bg === 'none') return;
      var re = /url\((['"]?)(.*?)\1\)/g, m;
      while ((m = re.exec(bg))) {
        if (m[2] && m[2].indexOf('data:') !== 0) urls[m[2]] = 1;
      }
    });
    return Object.keys(urls);
  }

  /* html2canvas re-requests every image with crossOrigin set (useCORS). If the
     browser cache only holds a plain non-CORS copy it reuses that, the CORS
     check fails, and the image is dropped from the render — the page still
     looks right, so the loss is invisible until you look at the screenshot.
     Fetching each URL once in CORS mode first puts a CORS-valid copy in the
     cache, so html2canvas's own loads all hit. Also clears loading="lazy",
     which would otherwise leave below-the-fold cards unfetched. */
  /* Can html2canvas read this image? It re-requests with crossOrigin, so an
     image the browser only holds a plain non-CORS copy of will fail — drawing
     it to a throwaway canvas and reading a pixel back is the same test. */
  function _metaReadable(im) {
    if (!im || !im.naturalWidth) return false;
    try {
      var c = document.createElement('canvas');
      c.width = 1; c.height = 1;
      var x = c.getContext('2d');
      x.drawImage(im, 0, 0, 1, 1);
      x.getImageData(0, 0, 1, 1);
      return true;
    } catch (e) { return false; }
  }

  /* Anything not readable gets re-fetched in CORS mode with the cache bypassed
     and handed to the clone as a blob: url, which is same-origin and needs no
     CORS at all. That also replaces the poisoned cache entry, so later captures
     are cheap. Returns a { url -> blobUrl } map for onclone to apply. */
  function _metaPreloadImages(rootEl, cb) {
    Array.prototype.forEach.call(rootEl.querySelectorAll('img[loading]'), function (im) {
      im.removeAttribute('loading');
    });

    var byUrl = {};
    Array.prototype.forEach.call(rootEl.querySelectorAll('img'), function (im) {
      var s = im.getAttribute('src');
      if (s) byUrl[s] = byUrl[s] || im;
    });

    var need = _metaImageUrls(rootEl).filter(function (u) {
      return !_metaReadable(byUrl[u]);   // background urls have no <img>, so always re-fetched
    });

    var map = {}, pending = need.length, finished = false;
    function finish() { if (!finished) { finished = true; cb(map); } }
    if (!pending) return finish();

    need.forEach(function (u) {
      var settle = function () { if (--pending <= 0) finish(); };
      if (!window.fetch) return settle();
      window.fetch(u, { mode: 'cors', cache: 'reload', credentials: 'omit' })
        .then(function (r) { return r.ok ? r.blob() : null; })
        .then(function (b) {
          if (b) { try { map[u] = URL.createObjectURL(b); } catch (e) {} }
          settle();
        })
        .catch(settle);   // best effort: a failure just means that one drops
    });
    setTimeout(finish, 20000);   // never leave the button stuck on a stalled image
  }

  function _metaDlBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /* Preview + Save. Saving from that button is a FRESH user gesture, which is
     what iOS needs for navigator.share -> Save to Photos (sharing straight
     after the async capture loses the original tap's activation). */
  function _metaShowShot(blob, filename) {
    if (!blob) return;
    var canShareFiles = false;
    try {
      canShareFiles = !!(navigator.canShare &&
        navigator.canShare({ files: [new File([blob], filename, { type: 'image/png' })] }));
    } catch (e) {}
    var touch = (navigator.maxTouchPoints || 0) > 0 || ('ontouchstart' in window);
    if (!(canShareFiles && touch)) { _metaDlBlob(blob, filename); return; }

    var overlay = document.createElement('div'); overlay.className = 'meta-shot-overlay';
    var img = document.createElement('img'); img.src = URL.createObjectURL(blob);
    overlay.appendChild(img);
    function close() {
      try { URL.revokeObjectURL(img.src); } catch (e) {}
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }
    var actions = document.createElement('div'); actions.className = 'meta-shot-actions';
    var save = document.createElement('button'); save.type = 'button';
    save.className = 'meta-shot-btn meta-shot-save';
    save.textContent = canShareFiles ? 'Save Image' : 'Download';
    save.addEventListener('click', function () {
      if (!canShareFiles) { _metaDlBlob(blob, filename); close(); return; }
      navigator.share({ files: [new File([blob], filename, { type: 'image/png' })] })
        .then(close)
        .catch(function (err) {
          if (err && err.name === 'AbortError') return;   // user cancelled the sheet
          _metaDlBlob(blob, filename); close();           // genuine failure -> download
        });
    });
    var closeB = document.createElement('button'); closeB.type = 'button';
    closeB.className = 'meta-shot-btn meta-shot-close'; closeB.textContent = 'Close';
    closeB.addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    actions.appendChild(save); actions.appendChild(closeB); overlay.appendChild(actions);
    document.body.appendChild(overlay);
  }

  function _metaCapture(rootEl, filename, btn) {
    _metaPreloadImages(rootEl, function (blobMap) {
    function _revoke() {
      Object.keys(blobMap).forEach(function (k) {
        try { URL.revokeObjectURL(blobMap[k]); } catch (e) {}
      });
    }
    withHtml2Canvas(function (ok) {
      if (!ok) { if (btn) { btn.disabled = false; btn.title = 'Screenshot unavailable'; } _revoke(); return; }
      window.html2canvas(rootEl, {
        backgroundColor: '#07060f', useCORS: true, scale: 2, logging: false,
        imageTimeout: 30000,   // default is 15s, which slow connections overrun -> blank tiles
        windowWidth: 1400, windowHeight: Math.max(2000, window.innerHeight || 900),
        onclone: function (doc) {
          // The live roots are full-bleed via width:100vw + left:50% + translateX(-50%).
          // In the clone that offset would push the render half a viewport sideways,
          // so pin them to a plain fixed-width block instead.
          ['.metaRoot', '.seamlessRoot'].forEach(function (sel) {
            Array.prototype.forEach.call(doc.querySelectorAll(sel), function (el) {
              el.style.width = '1400px'; el.style.left = '0';
              el.style.transform = 'none'; el.style.marginBottom = '0';
            });
          });
          if (doc.documentElement) doc.documentElement.style.width = '1400px';
          if (doc.body) { doc.body.style.width = '1400px'; doc.body.style.margin = '0'; }
          // html2canvas renders the clone in an off-screen iframe, so images still
          // marked loading="lazy" are never in its viewport and the browser never
          // fetches them — they paint blank. Strip it in the clone.
          Array.prototype.forEach.call(doc.querySelectorAll('img[loading]'), function (im) {
            im.removeAttribute('loading');
          });
          // Swap in the same-origin blob copies fetched above, so html2canvas
          // never has to make a cross-origin request of its own.
          Array.prototype.forEach.call(doc.querySelectorAll('img'), function (im) {
            var s = im.getAttribute('src');
            if (s && blobMap[s]) { im.removeAttribute('crossorigin'); im.src = blobMap[s]; }
          });
          var _bgEls = [doc.documentElement].concat(
            Array.prototype.slice.call(doc.querySelectorAll('*')));
          _bgEls.forEach(function (el) {
            if (!el || !el.style) return;
            var bg = el.style.backgroundImage;
            if (!bg || bg === 'none') return;
            Object.keys(blobMap).forEach(function (u) {
              if (bg.indexOf(u) !== -1) el.style.backgroundImage = 'url("' + blobMap[u] + '")';
            });
          });
          // Controls are UI, not content — keep them out of the shot.
          Array.prototype.forEach.call(
            doc.querySelectorAll('.metaControls,.seamlessControls'),
            function (el) { el.style.display = 'none'; }
          );
        }
      }).then(function (canvas) {
        canvas.toBlob(function (blob) {
          _metaShowShot(blob, filename);
          if (btn) btn.disabled = false;
          _revoke();
        }, 'image/png');
      }).catch(function (e) {
        console.error('Meta screenshot failed:', e);
        if (btn) btn.disabled = false;
        _revoke();
      });
    });
    });
  }

  function makeCamBtn(rootEl, nameFn) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'meta-cam-btn';
    btn.setAttribute('aria-label', 'Screenshot');
    btn.title = 'Screenshot';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>' +
      '<circle cx="12" cy="13" r="4"></circle></svg>';
    btn.addEventListener('click', function () {
      if (btn.disabled) return;
      btn.disabled = true;
      _metaCapture(rootEl, (typeof nameFn === 'function' ? nameFn() : 'fntd-meta') + '.png', btn);
    });
    return btn;
  }

  function makeClutterBtn(container) {
    var on = true;
    var btn = document.createElement('button');
    btn.className = 'meta-clutter-btn';
    btn.textContent = 'ICONS';
    btn.addEventListener('click', function () {
      on = !on;
      container.classList.toggle('meta-clutter-off', !on);
      btn.classList.toggle('cltr-off', !on);
    });
    return btn;
  }

  function buildCardRow(row, META_CFG) {
    function renderCards() {
      row.innerHTML = '';
      META_CFG.units.forEach(function (unitCfg) {
        var u = unitMap[unitCfg.name] || {};
        var rar = (u.rarity || '').toLowerCase(), isShiny = rar === 'shiny';
        var bg = getRarityBg(unitCfg.name, rar);

        var card = document.createElement('div');
        card.className = 'meta-card' + (isShiny ? ' meta-shiny' : '');
        card.style.background = bg;

        var inner = document.createElement('div'); inner.className = 'meta-card-inner'; inner.style.background = getRarityFill(rar);

        var img = document.createElement('img');
        img.className = 'meta-card-img'; img.alt = unitCfg.name;
        // Load in CORS mode so the browser caches a CORS-valid copy. html2canvas
        // re-requests these with crossOrigin set; if the cache only holds a plain
        // non-CORS response the browser reuses it, the CORS check fails, and the
        // render is silently dropped from the screenshot while the page looks fine.
        // Must be set before .src — assigning it afterwards has no effect.
        img.crossOrigin = 'anonymous';
        img.src = u.img || '';
        img.draggable = false; img.loading = 'lazy';
        img.onerror = function () {
          // If CORS is unavailable, retry as a plain load so the page still shows
          // the render (it just will not appear in a capture).
          if (this.getAttribute('crossorigin') && this.getAttribute('src')) {
            var s = this.getAttribute('src');
            this.removeAttribute('crossorigin');
            this.src = s;
            return;
          }
          this.style.cssText = 'width:100%;height:100%;display:block';
          this.removeAttribute('src');
        };
        inner.appendChild(img);

        var enchData = META_CFG.enchants[unitCfg.enchant];
        if (enchData) {
          var eW = document.createElement('div'); eW.className = 'meta-enchant'; eW.style.background = enchData.color;
          var eI = document.createElement('div'); eI.className = 'meta-enchant-inner';
          var eM = document.createElement('img'); _metaImgSrc(eM, enchData.url); eM.alt = unitCfg.enchant;
          eI.appendChild(eM); eW.appendChild(eI); inner.appendChild(eW);
        }

        var pInfo = metaPathInfo(unitCfg, u);
        if (pInfo) {
          var pW = document.createElement('div');
          pW.className = 'meta-path ' + metaPathCorner(unitCfg, META_CFG) +
            (pInfo.secondary ? ' meta-path-pair' : '') + (isShiny ? ' meta-shiny' : '');
          pW.style.background = bg;
          if (isShiny) pW.style.backgroundSize = '200% 200%';
          var pI = document.createElement('div'); pI.className = 'meta-path-inner'; pI.style.background = getRarityFill(rar);
          var legs = pInfo.secondary ? [['path-b', pInfo.secondary], ['path-a', pInfo.primary]]
                                     : [['', pInfo.primary]];
          legs.forEach(function (pr) {
            var pM = document.createElement('img');
            if (pr[0]) pM.className = pr[0];
            _metaImgSrc(pM, pr[1].url);
            pM.alt = 'Path ' + pr[1].pathNo + ' Tier ' + pr[1].tier;
            pI.appendChild(pM);
          });
          pW.appendChild(pI); inner.appendChild(pW);
        }

        var bytes = metaBytes(unitCfg, META_CFG);
        if (bytes.length) {
          var bR = (bytes[0].data.rarity || '').toLowerCase(), bSh = bR === 'shiny';
          var bW = document.createElement('div');
          bW.className = 'meta-byte' + (bSh ? ' meta-shiny' : '') + (bytes.length > 1 ? ' meta-byte-pair' : '');
          bW.style.background = metaByteBg(bytes);
          if (bSh) bW.style.backgroundSize = '200% 200%';
          var bI = document.createElement('div'); bI.className = 'meta-byte-inner'; bI.style.background = getRarityFill(bR);
          var bLegs = bytes.length > 1 ? [['byte-b', bytes[1]], ['byte-a', bytes[0]]] : [['', bytes[0]]];
          bLegs.forEach(function (pr) {
            var bM = document.createElement('img');
            if (pr[0]) bM.className = pr[0];
            _metaImgSrc(bM, pr[1].data.url); bM.alt = pr[1].name;
            bI.appendChild(bM);
          });
          bW.appendChild(bI); inner.appendChild(bW);
        }

        if (unitCfg.replacement) {
          var rU = unitMap[unitCfg.replacement] || {}, rR = (rU.rarity || '').toLowerCase(), rSh = rR === 'shiny';
          var rW = document.createElement('div');
          rW.className = 'meta-replacement' + (rSh ? ' meta-shiny' : ''); rW.style.background = getRarityBg(unitCfg.replacement, rR);
          if (rSh) rW.style.backgroundSize = '200% 200%';
          var rI = document.createElement('div'); rI.className = 'meta-replacement-inner'; rI.style.background = getRarityFill(rR);
          var rM = document.createElement('img'); _metaImgSrc(rM, rU.img || ''); rM.alt = unitCfg.replacement; rM.draggable = false; rM.loading = 'lazy';
          rI.appendChild(rM); rW.appendChild(rI); inner.appendChild(rW);
        }

        if (unitCfg.label) {
          var lO = document.createElement('div');
          lO.className = 'meta-label' + (isShiny ? ' meta-shiny' : ''); lO.style.background = bg;
          if (isShiny) lO.style.backgroundSize = '200% 200%';
          var lI = document.createElement('div'); lI.className = 'meta-label-inner'; lI.textContent = unitCfg.label;
          lO.appendChild(lI); inner.appendChild(lO);
        }

        if (unitCfg.chip) {
          var chipD = META_CFG.chips && META_CFG.chips[unitCfg.chip];
          if (chipD) {
            var chR = (chipD.rarity || '').toLowerCase(), chSh = chR === 'shiny';
            var chipPosClass = '';
            if (unitCfg.label) {
              chipPosClass = unitCfg.replacement ? ' chip-mid-right' : ' chip-bottom-right';
            }
            var cW = document.createElement('div');
            cW.className = 'meta-chip' + (chSh ? ' meta-shiny' : '') + chipPosClass;
            cW.style.background = getRarityBg(unitCfg.chip, chR);
            if (chSh) cW.style.backgroundSize = '200% 200%';
            var cI = document.createElement('div'); cI.className = 'meta-chip-inner'; cI.style.background = getRarityFill(chR);
            var cM = document.createElement('img'); _metaImgSrc(cM, chipD.url); cM.alt = unitCfg.chip;
            cI.appendChild(cM); cW.appendChild(cI); inner.appendChild(cW);
          }
        }

        card.appendChild(inner);

        card._metaShowTip = (function (c, cfg, data) {
          return function () { showTip(c, cfg, data, META_CFG); };
        }(card, unitCfg, u));
        card.addEventListener('click', function () { tipShowFor(card); });

        var slot = document.createElement('div'); slot.className = 'meta-slot';
        slot.appendChild(card);
        if (unitCfg.caption) {
          var cap = document.createElement('div'); cap.className = 'meta-caption'; cap.textContent = unitCfg.caption;
          slot.appendChild(cap);
        }
        row.appendChild(slot);
      });
    }

    renderCards();
    return renderCards;
  }

  function renderMeta(mountEl, META_CFG) {
    var root = document.createElement('div');
    root.className = 'metaRoot';
    _metaSetBg(root, META_CFG.background);

    var titleEl = document.createElement('div');
    titleEl.className = 'metaTitle'; titleEl.textContent = META_CFG.title;
    root.appendChild(titleEl);

    var controls = document.createElement('div'); controls.className = 'metaControls';
    controls.appendChild(makeCamBtn(root, function () {
      return 'fntd-meta-' + (_metaSlug(META_CFG.title) || 'team');
    }));
    controls.appendChild(makeClutterBtn(root));
    root.appendChild(controls);

    var row = document.createElement('div'); row.className = 'metaRow';
    root.appendChild(row);

    var footer = document.createElement('div'); footer.className = 'metaFooter';
    if (META_CFG.logoUrl) {
      var logoEl = document.createElement('img'); logoEl.className = 'metaLogo'; _metaImgSrc(logoEl, META_CFG.logoUrl); logoEl.alt = '';
      footer.appendChild(logoEl);
    }
    var siteEl = document.createElement('div'); siteEl.className = 'metaSiteUrl'; siteEl.textContent = META_CFG.siteUrl;
    footer.appendChild(siteEl);
    root.appendChild(footer);

    mountEl.appendChild(root);
    return buildCardRow(row, META_CFG);
  }

  function _metaSlug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
  // Deep link: reflect the active seamless tab in /fntd2/meta-teams/<slug> (first tab = base URL).
  function _metaSyncUrl(slug, idx) {
    if (location.pathname.indexOf('meta-teams') === -1) return;
    var base = location.pathname.replace(/(meta-teams)(\/.*)?$/, '$1');
    var np = base + (idx > 0 && slug ? '/' + slug : '');
    try { history.replaceState(null, '', np + location.search + location.hash); } catch (e) {}
  }
  function renderSeamless(mountEl, metasData) {
    var shared  = metasData.shared  || {};
    var seamCfg = metasData.seamless || {};
    if (seamCfg === true) seamCfg = {};

    /* support old format (single pageTitle+order) and new format (pages array) */
    var pages = seamCfg.pages;
    if (!pages || !pages.length) {
      pages = [{ pageTitle: seamCfg.pageTitle, pageNote: seamCfg.pageNote, order: seamCfg.order }];
    }

    var root = document.createElement('div');
    root.className = 'seamlessRoot';
    _metaSetBg(root, shared.background || '');

    /* ── fixed header ── */
    var header = document.createElement('div'); header.className = 'seamlessHeader';
    if (shared.logoUrl) {
      var logo = document.createElement('img'); logo.className = 'seamlessLogo'; _metaImgSrc(logo, shared.logoUrl); logo.alt = '';
      header.appendChild(logo);
    }
    var siteName = document.createElement('div'); siteName.className = 'seamlessSiteName';
    siteName.textContent = seamCfg.siteName || 'FNTD USER GUIDE';
    header.appendChild(siteName);
    root.appendChild(header);

    if (shared.siteUrl) {
      var siteUrlEl = document.createElement('div'); siteUrlEl.className = 'seamlessSiteUrl';
      siteUrlEl.textContent = shared.siteUrl; root.appendChild(siteUrlEl);
    }

    var controls = document.createElement('div'); controls.className = 'seamlessControls';
    // Name the file after whichever tab is open when the shot is taken. pageWrappers
    // is filled in below, but this only runs on click, so it is populated by then.
    controls.appendChild(makeCamBtn(root, function () {
      var idx = 0;
      for (var i = 0; i < pageWrappers.length; i++) {
        if (pageWrappers[i].style.display !== 'none') { idx = i; break; }
      }
      var t = (pages[idx] && pages[idx].pageTitle) || seamCfg.pageTitle || '';
      return 'fntd-meta-' + (_metaSlug(t) || 'teams');
    }));
    controls.appendChild(makeClutterBtn(root));
    root.appendChild(controls);

    /* ── page-switcher tab bar (only when multiple pages) ── */
    var tabBar = null;
    var pageWrappers = [];
    var reRenders = [];

    if (pages.length > 1) {
      tabBar = document.createElement('div');
      tabBar.className = 'seamlessPageTabBar';
      root.appendChild(tabBar);
    }

    pages.forEach(function (page, pageIdx) {
      /* wrapper holds the pageTitle + all sections for this page */
      var wrap = document.createElement('div');
      if (pageIdx > 0) wrap.style.display = 'none';
      pageWrappers.push(wrap);

      if (page.pageNote) {
        var pnEl = document.createElement('div'); pnEl.className = 'seamlessPageNote';
        pnEl.textContent = page.pageNote; wrap.appendChild(pnEl);
      }

      var order = page.order || Object.keys(metasData.metas || {});
      order.forEach(function (metaName) {
        var cfg = metasData.metas && metasData.metas[metaName];
        if (!cfg) return;

        var section = document.createElement('div'); section.className = 'seamlessSection';

        var titleEl = document.createElement('div'); titleEl.className = 'seamlessSectionTitle';
        titleEl.textContent = metaName; section.appendChild(titleEl);

        var row = document.createElement('div'); row.className = 'metaRow';
        section.appendChild(row);
        wrap.appendChild(section);

        var META_CFG = {
          title:    metaName,
          logoUrl:  '', siteUrl: '', background: '',
          bytes:    shared.bytes    || {},
          enchants: shared.enchants || {},
          chips:    shared.chips    || {},
          units:    cfg.units       || []
        };
        reRenders.push(buildCardRow(row, META_CFG));
      });

      root.appendChild(wrap);

      /* build the tab button for this page */
      if (tabBar) {
        var tab = document.createElement('button');
        tab.className = 'seamlessPageTab' + (pageIdx === 0 ? ' seamlessPageTabActive' : '');
        tab.textContent = page.pageTitle || ('List ' + (pageIdx + 1));
        (function (i) {
          tab.addEventListener('click', function () {
            pageWrappers.forEach(function (w, j) { w.style.display = j === i ? '' : 'none'; });
            var tabs = tabBar.querySelectorAll('.seamlessPageTab');
            for (var k = 0; k < tabs.length; k++) tabs[k].classList.toggle('seamlessPageTabActive', k === i);
            _metaSyncUrl(_metaSlug(pages[i].pageTitle || ''), i);
          });
        }(pageIdx));
        tabBar.appendChild(tab);
      }
    });

    /* Deep link: /fntd2/meta-teams/<slug> opens that tab on load. */
    if (tabBar) {
      var _seg = (location.pathname.match(/meta-teams\/([^\/?#]+)/) || [])[1];
      if (_seg) {
        _seg = decodeURIComponent(_seg).toLowerCase();
        var _target = -1;
        pages.forEach(function (pg, idx) { if (_metaSlug(pg.pageTitle || '') === _seg) _target = idx; });
        if (_target > 0) {
          pageWrappers.forEach(function (w, j) { w.style.display = j === _target ? '' : 'none'; });
          var _tabs = tabBar.querySelectorAll('.seamlessPageTab');
          for (var _k = 0; _k < _tabs.length; _k++) _tabs[_k].classList.toggle('seamlessPageTabActive', _k === _target);
        }
      }
    }

    mountEl.appendChild(root);
    return reRenders;
  }

  var metasData       = null;
  var activeReRenders = [];

  function renderAllMounts() {
    var mounts = Array.prototype.slice.call(
      document.querySelectorAll('.metaMount[data-meta], .metaMount[data-seamless], #tlMount[data-meta]')
    );
    mounts.forEach(function (mountEl) {
      if (mountEl.getAttribute('data-rendered')) return;
      mountEl.setAttribute('data-rendered', '1');

      if (mountEl.hasAttribute('data-seamless')) {
        var rrs = renderSeamless(mountEl, metasData || { shared: {}, metas: {}, seamless: {} });
        rrs.forEach(function (fn) { activeReRenders.push(fn); if (unitMapReady) fn(); });
        return;
      }

      var name = mountEl.getAttribute('data-meta');
      var cfg  = metasData && metasData.metas && metasData.metas[name];
      if (!cfg) {
        var err = document.createElement('div');
        err.style.cssText = 'color:#ffa45b;font-family:monospace;padding:10px;font-size:12px';
        err.textContent = 'Meta "' + name + '" not found in metas.json';
        mountEl.appendChild(err); return;
      }
      var shared = (metasData && metasData.shared) || {};
      var META_CFG = {
        title:      name,
        logoUrl:    shared.logoUrl    || '',
        siteUrl:    shared.siteUrl    || '',
        background: shared.background || '',
        bytes:      shared.bytes      || {},
        enchants:   shared.enchants   || {},
        chips:      shared.chips      || {},
        units:      cfg.units         || []
      };
      var rr = renderMeta(mountEl, META_CFG);
      activeReRenders.push(rr);
      if (unitMapReady) rr();
    });
  }

  var wikiQueue = [], wikiReadyFns = [];
  function wikiCfg(title, units) {
    var shared = (metasData && metasData.shared) || {};
    return {
      title:      title || '',
      logoUrl:    shared.logoUrl    || '',
      siteUrl:    shared.siteUrl    || '',
      background: shared.background || '',
      bytes:      shared.bytes      || {},
      enchants:   shared.enchants   || {},
      chips:      shared.chips      || {},
      units:      units             || []
    };
  }
  function wikiReady() { return !!metasData && unitMapReady; }
  function wikiFlush() {
    var q = wikiQueue; wikiQueue = [];
    q.forEach(function (fn) { fn(); });
    if (wikiReady()) { var r = wikiReadyFns; wikiReadyFns = []; r.forEach(function (fn) { fn(); }); }
  }
  window.FntdMeta = {
    render: function (mountEl, title, units) {
      function go() {
        mountEl.innerHTML = '';
        var rr = renderMeta(mountEl, wikiCfg(title, units));
        if (unitMapReady) rr();
        else activeReRenders.push(function () { if (mountEl.isConnected) rr(); });
      }
      if (metasData) go(); else wikiQueue.push(go);
    },
    onReady: function (fn) { if (wikiReady()) fn(); else wikiReadyFns.push(fn); },
    shared: function () { return (metasData && metasData.shared) || {}; },
    units: function () { return unitMap; },
    rarityBg: function (name, rar) { return getRarityBg(name, String(rar || '').toLowerCase()); },
    rarityFill: function (rar) { return getRarityFill(String(rar || '').toLowerCase()); }
  };

  var xM = new XMLHttpRequest();
  xM.open('GET', METAS_URL, true);
  xM.onload = function () {
    try   { metasData = JSON.parse(xM.responseText); }
    catch (e) { metasData = { shared: {}, metas: {} }; }
    renderAllMounts();
    wikiFlush();
  };
  xM.onerror = function () { metasData = { shared: {}, metas: {} }; renderAllMounts(); wikiFlush(); };
  xM.send();

  var xC = new XMLHttpRequest();
  xC.open('GET', UNITS_URL, true);
  xC.onload = function () {
    try {
      JSON.parse(xC.responseText).forEach(function (u) {
        unitMap[u.name] = { img: u.imgNormal || '', rarity: u.rarity || '', role: u.role || u.type || '', paths: u.paths || null };
      });
    } catch (e) {}
    unitMapReady = true;
    activeReRenders.forEach(function (fn) { fn(); });
    wikiFlush();
  };
  xC.send();
}());
