(()=>{"use strict";const n=document.querySelector(".nav-toggle"),t=document.querySelector(".links"),e=document.querySelector(".box-container"),s=document.querySelector(".shown-movies");n.addEventListener("click",(()=>{t.classList.toggle("show-links")})),(async()=>{const n=await(async n=>await fetch(`https://api.tvmaze.com/search/shows?q=${n}`).then((n=>n.json())))("s"),t=new DocumentFragment,o=new DOMParser;n.forEach(((n,e)=>{const{show:s}=n,a=`\n            <div class="box" data-id=${n.show.id}>\n              <div class="box-img">\n                <img src="${s.image.original}" alt="${s.name}"/>\n              </div>\n              <div class="box-desc">\n                <h4>${s.name}</h4>\n                <div class="likes" data-id="${n.show.id}">\n                  <a href="#" class="like-btn"><i class="fa-regular fa-heart"></i></a>\n                  <small>${n.show.id} likes</small>\n                </div>\n              </div>\n              <div class="btn-container" data-index="${e}" role="button">\n                <button class="btn btn-comments" type="button" id=${s.externals.thetvdb}>\n                  comments\n              </button>\n                <button type="button" class="btn">Reservations</button>\n              </div>\n            </div>`,i=o.parseFromString(a,"text/html").body.firstChild;console.log(i),t.appendChild(i)})),e.appendChild(t);const a=(n=>{const t=document.querySelectorAll(`.${n}`);let e=0;return t.forEach((()=>{e+=1})),e})("box");s.innerText=`Shows(${a})`})()})();