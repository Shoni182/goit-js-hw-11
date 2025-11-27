import{a as p,S as f,G as d,i as g}from"./assets/vendor-BeEWunMt.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const y=p.create({baseURL:"https://pixabay.com/api/",params:{key:"53374429-639c77152d70b3fe75f006246",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0}});function h(r){return y.get("",{params:{q:r}})}let v={galleryElem:document.querySelector(".gallery")};const{galleryElem:l}=v;let o=null;function L({webformatURL:r,largeImageURL:a,tags:s,likes:i,views:e,comments:t,downloads:n}){let u=s.split(",").slice(0,3);return`
  <li class="list-item">
        <div class="item-container">
        <a href="${a}" class="">
          <img src="${r}" alt="${u}" class="item-img">
          </a>
          <div class="desc-container">
            <p class="item-title">Likes <span item-num>${i}</span></p>
            <p class="item-title">Views <span item-num>${e}</span></p>
            <p class="item-title">Comments <span item-num>${t}</span></p>
            <p class="item-title">Downloads <span item-num>${n}</span></p>
          </div>
        </div>
      </li>`}function D(r){const a=r.map(L).join(""),s=new f(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.85});return l.innerHTML=a,s.refresh(),a}function b(){l.innerHTML=""}function w(){o||(l.insertAdjacentHTML("beforebegin",'<div class="loader"></div>'),o=document.querySelector(".loader"))}function m(){o&&(o.remove(),o=null)}let S=new d({element:"#granim-canvas",name:"granim",opacity:[1,1],states:{"default-state":{gradients:[["#834D9B","#D04ED6"],["#1CD8D2","#93EDC7"]]}}});const q={form:document.querySelector(".form")},{form:c}=q;c.addEventListener("submit",r=>{r.preventDefault(),w(),window.addEventListener("resize",function(){S.changeSize()});const s=new FormData(c).get("search-text").trim();b(),c.reset(),h(s).then(i=>{const e=i.data.hits;if(e.length===0)return Promise.reject(error);D(e),m()}).catch(i=>{m(),g.show({messageSize:"20",message:"Sorry, there are no images matching your search query. Please try again!",position:"center",close:!0,closeOnEscape:!0,theme:"light",color:"red"})})});
//# sourceMappingURL=index.js.map
