(this["webpackJsonpcovid-19-search"]=this["webpackJsonpcovid-19-search"]||[]).push([[0],{102:function(e,t){},104:function(e,t){},114:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(50),s=a.n(c),i=(a(57),a(19)),o=a(11),l=a(16),h=a(3),u=a(4),m=a(5),d=a(6);function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function f(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var g=r.a.createElement("linearGradient",{id:"linear0",gradientUnits:"userSpaceOnUse",x1:255.999957465,x2:255.999957465,y1:.499580565,y2:511.240870365},r.a.createElement("stop",{offset:0,stopColor:"#2af598"}),r.a.createElement("stop",{offset:1,stopColor:"#009efd"})),v=r.a.createElement("path",{d:"m164.59375 511.242188c-42.167969 0-84.339844-16.054688-116.441406-48.15625-64.121094-64.121094-64.203125-168.402344-.253906-232.628907 58.878906-63.113281 202.25-188.910156 208.332031-194.238281l40.402343-35.414062-16.1875 115.140624 231.554688-115.445312-115.597656 228.496094 114.796875-16.277344-33.972657 40.046875c-5.039062 5.941406-124.03125 145.976563-196.609374 210.734375-32.046876 31.824219-74.039063 47.742188-116.023438 47.742188zm77.476562-409.089844c-48.132812 43.046875-126.761718 114.519531-165.199218 155.769531l-.488282.507813c-48.640624 48.640624-48.640624 127.785156 0 176.425781 48.640626 48.644531 127.785157 48.644531 176.425782 0l.839844-.792969c47.042968-41.886719 116.839843-119.554688 158.386718-166.960938l-85.800781 12.167969 95.757813-189.289062-191.644532 95.546875zm-77.476562 326.328125c-45.125 0-81.835938-36.710938-81.835938-81.835938s36.710938-81.839843 81.835938-81.839843 81.839844 36.714843 81.839844 81.839843-36.714844 81.835938-81.839844 81.835938zm0-123.753907c-23.113281 0-41.917969 18.804688-41.917969 41.917969s18.804688 41.917969 41.917969 41.917969 41.917969-18.804688 41.917969-41.917969-18.804688-41.917969-41.917969-41.917969zm0 0",fill:"url(#linear0)"}),y=function(e){var t=e.svgRef,a=e.title,n=f(e,["svgRef","title"]);return r.a.createElement("svg",p({height:"511pt",viewBox:"1 0 511.99996 511",width:"511pt",ref:t},n),a?r.a.createElement("title",null,a):null,g,v)},E=r.a.forwardRef((function(e,t){return r.a.createElement(y,p({svgRef:t},e))})),b=(a.p,a(58),a(51)),k=a.n(b),S=a(25),C=a.n(S);C.a.defaults.global.defaultFontColor="#dddddd";var N=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(h.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).chartCtx=null,e.chart=void 0,e.lastRegionData=void 0,e}return Object(u.a)(a,[{key:"initChart",value:function(){var e=this;this.chartCtx?this.chart=new C.a(this.chartCtx,{type:"bar",data:{labels:[],datasets:[{label:"Remain",backgroundColor:"#008d93",data:[]},{label:"Deceased",backgroundColor:"#3b5c7a",data:[]},{label:"Recovered",backgroundColor:"#45c490",data:[]}]},options:{tooltips:{displayColors:!0},scales:{xAxes:[{stacked:!0,gridLines:{display:!1},ticks:{display:!1}}],yAxes:[{stacked:!0,ticks:{beginAtZero:!0},type:"linear"}]},responsive:!0,maintainAspectRatio:!1,legend:{position:"bottom"}}}):setTimeout((function(){return e.initChart()}),250)}},{key:"updateChartData",value:function(){var e=this;if(this.chart){var t=this.props.regionData,a=new Date(t.epidemic.begin),n=t.epidemic.data.map((function(e,t){var n=new Date(a);n.setDate(a.getDate()+t);var r=Object(o.a)(e,6),c=r[0],s=(r[1],r[2]),i=r[3];r[4],r[5];return s=s||0,i=i||0,{Remain:Math.max(0,(c||0)-s-i),Recovered:s,Deceased:i,Date:k()(n,"yyyy-mm-dd")}})),r=n.map((function(e){return e.Date}));this.chart.data.labels=r,this.chart.data.datasets[0].data=n.map((function(e){return e.Remain})),this.chart.data.datasets[1].data=n.map((function(e){return e.Deceased})),this.chart.data.datasets[2].data=n.map((function(e){return e.Recovered})),this.chart.update()}else setTimeout((function(){return e.updateChartData()}),250)}},{key:"componentDidMount",value:function(){this.initChart()}},{key:"render",value:function(){var e=this,t=this.props.regionData;t!==this.lastRegionData&&(this.lastRegionData=t,this.updateChartData());var a=Object(o.a)(t.epidemic.data[t.epidemic.data.length-1],6),n=a[0],c=(a[1],a[2]),s=a[3];a[4],a[5];return r.a.createElement("div",{className:"region-info-box"},r.a.createElement("div",{className:"name"},r.a.createElement("div",{className:"primary"},t.enname),r.a.createElement("div",{className:"secondary"},t.zhname)),r.a.createElement("div",{className:"epidemic-info"},null!==n&&r.a.createElement("div",null,"Confirmed: ",n),null!==c&&r.a.createElement("div",null,"Recovered: ",c," (",(c/n*100).toFixed(2),"%)"),null!==s&&r.a.createElement("div",null,"Deceased: ",s," (",(s/n*100).toFixed(2),"%)")),r.a.createElement("div",{className:"trend-chart-container"},r.a.createElement("canvas",{ref:function(t){e.chartCtx=t}})),this.props.relatedRegions.length>0&&r.a.createElement("div",{className:"related-areas"},"Related Areas: ",this.props.relatedRegions.map((function(t,a){return r.a.createElement("span",{key:a},0===a?"":", ",r.a.createElement("span",{className:"link",onClick:function(){e.props.onSearch(t.id.replace(/\|/g,", "))}},t.enname))}))))}}]),a}(r.a.Component),x=(a(60),a(2)),D=a.n(x),O=a(12),j=a.n(O),I=(a(77),function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"detail-box"},r.a.createElement("div",{className:"header"},"Related Events"),r.a.createElement("div",{className:"close-btn",onClick:this.props.onClose},r.a.createElement("i",{className:"far fa-times-circle"})),this.props.entry.related_events.map((function(e,t){return r.a.createElement("div",{className:"related-events",key:t},r.a.createElement("span",{className:"date"},e.time.split(" ")[0].replace(/\//g,"-")),r.a.createElement("span",null,r.a.createElement("a",{href:e.urls.length>0?e.urls[0]:"#",target:"_blank",rel:"noopener noreferrer"},e.title)))})))}}]),a}(r.a.Component)),R=(a(78),function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"getAbstract",value:function(){var e=this,t=(this.props.entity.abstracts.enwiki||this.props.entity.abstracts.zhwiki||"").replace(/<span>|<\/span>/g,"").replace(/<a href=[^>]+>(.+?)<\/a>/g,"###$1###").split("<br/>"),a=[];return t.forEach((function(t){var n=t.split("###").map((function(t,a){return a%2===0?r.a.createElement("span",{key:a,className:"n",dangerouslySetInnerHTML:{__html:t}}):r.a.createElement("span",{key:a,className:"h",dangerouslySetInnerHTML:{__html:t},onClick:function(){return e.props.onSearch(t)}})}));a.push(r.a.createElement("p",{key:a.length},n))})),a}},{key:"render",value:function(){var e=this.props.entity.label.label.replace(/]/g,"").split("[");return r.a.createElement("div",{className:"entity-box"},r.a.createElement("div",{className:"name"},r.a.createElement("div",{className:"primary"},e[0]),e.length>0&&r.a.createElement("div",{className:"secondary"},e[1])),r.a.createElement("div",{className:"abstract"},this.getAbstract()))}}]),a}(r.a.Component)),T=a(79),w=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).pageIndex=0,n.searchCancelSource=D.a.CancelToken.source(),n.entityCancelSource=D.a.CancelToken.source(),n.lastSearch="",n.lastEntitySearch="",n.searchQuery="",n.onSearch=j.a.debounce((function(){if(0!==n.searchQuery.length&&n.searchQuery!==n.lastSearch){var e=!n.state.focusEntity||n.lastEntitySearch!==n.searchQuery;n.lastSearch=n.searchQuery,n.searchCancelSource.cancel(),n.searchCancelSource=D.a.CancelToken.source(),n.setState({metaText:"Searching...",hoverEntry:void 0,focusEntity:e?void 0:n.state.focusEntity});var t=new Date;D.a.get("https://covid-dashboard-api.aminer.cn/search",{params:{q:n.searchQuery,skip:n.state.search.pageSize*n.pageIndex,limit:n.state.search.pageSize,sort:n.state.search.sort},cancelToken:n.searchCancelSource.token}).then((function(e){var a=((new Date).getTime()-t.getTime())/1e3;n.setState({search:Object(l.a)({},n.state.search,{entries:e.data.data,count:e.data.count}),metaText:"".concat(e.data.count," documents retrieved in ").concat(a.toFixed(4)," seconds.")})})).catch((function(e){D.a.isCancel(e)||(n.setState({metaText:"No documents found."}),console.error("search error",e))})),e&&(n.lastEntitySearch=n.searchQuery,n.entityCancelSource.cancel(),n.entityCancelSource=D.a.CancelToken.source(),D.a.get("https://api.xlore.org/query",{params:{instances:n.searchQuery},cancelToken:n.entityCancelSource.token}).then((function(e){var t=e.data.Instances.find((function(e){return e.Label.toLowerCase()===n.searchQuery.toLowerCase()}));t&&D.a.get("https://api.xlore.org/query",{params:{uri:t.Uri},cancelToken:n.entityCancelSource.token}).then((function(e){n.setState({focusEntity:e.data})})).catch((function(e){D.a.isCancel(e)||console.error("entity search error",e)}))})).catch((function(e){D.a.isCancel(e)||console.error("entity search error",e)})))}}),250),n.regionData={},n.searchKeyToRegionID={},n.regionIDToSubIDs={},n.state={query:"",search:{entries:[],count:0,pageSize:10,sort:"score"},metaText:""},n}return Object(u.a)(a,[{key:"reSearch",value:function(){this.lastSearch="",this.onSearch()}},{key:"onInputChange",value:function(e){this.setState({query:e}),this.searchQuery=e.trim(),this.searchQuery.length>0?(this.searchQuery!==this.lastSearch&&(this.pageIndex=0),window.scrollTo(0,0),this.onSearch()):(this.pageIndex=0,this.setState({search:Object(l.a)({},this.state.search,{entries:[],count:0})}))}},{key:"setSearchSort",value:function(e){e!==this.state.search.sort&&(this.pageIndex=0,this.setState({search:Object(l.a)({},this.state.search,{sort:e})}),this.state.search.entries&&this.reSearch())}},{key:"setSearchPageSize",value:function(e){e!==this.state.search.pageSize&&(this.pageIndex=0,this.setState({search:Object(l.a)({},this.state.search,{pageSize:e})}),this.state.search.entries&&this.reSearch())}},{key:"setPage",value:function(e){(e=Math.max(0,Math.min(e,Math.ceil(this.state.search.count/this.state.search.pageSize)-1)))!==this.pageIndex&&(this.pageIndex=e,this.reSearch())}},{key:"componentDidMount",value:function(){var e=this;Promise.all([D.a.get("https://covid-dashboard-api.aminer.cn/dist/epidemic.json",{headers:{"Cache-Control":"no-cache"}}),D.a.get("https://covid-dashboard-api.aminer.cn/dist/regions-info.csv",{headers:{"Cache-Control":"no-cache"}})]).then((function(t){var a=t[0].data,n=T(t[1].data).filter((function(e){return void 0!==a[e[0]]})),r={},c={},s={};n.forEach((function(t){var n=t,l=Object(o.a)(n,3),h=l[0],u=l[1],m=l[2];if(a[h]){var d=h.split("|"),p=m.split(" ");if(d.length<3)j.a.uniq([].concat(Object(i.a)(j.a.range(1,u.length+1).map((function(e){return u.slice(0,e)}))),Object(i.a)(j.a.range(1,p.length+1).map((function(e){return p.slice(0,e).join(" ")}))),Object(i.a)(j.a.range(0,p.length).map((function(e){return p.slice(e).join(" ")}))))).forEach((function(e){c[e]||(r[e]?(c[e]=!0,delete r[e]):r[e]=h)}));if(d.length>1){var f=d.slice(0,d.length-1).join("|");a[f]&&(s[f]?s[f].push(h):s[f]=[h])}e.regionData[h]={zhname:u,enname:m,epidemic:a[h]}}})),e.searchKeyToRegionID=r,e.regionIDToSubIDs=s}))}},{key:"getRegion",value:function(){var e=this.state.query,t=e.replace(/, /g,"|");if(this.regionData[t])return[t,this.regionData[t]];for(var a=e.length;a>=1;--a)for(var n=0;n<=e.length-a;++n){var r=e.slice(n,n+a);if(this.searchKeyToRegionID[r])return[this.searchKeyToRegionID[r],this.regionData[this.searchKeyToRegionID[r]]]}return[void 0,void 0]}},{key:"getRelatedRegion",value:function(e){var t=this,a=[];if(e.indexOf("|")>=0){var n=e.slice(0,e.lastIndexOf("|")),r=this.regionData[n];r&&a.push({id:n,enname:r.enname,zhname:r.zhname})}return(this.regionIDToSubIDs[e]||[]).forEach((function(e){var n=t.regionData[e];n&&a.push({id:e,enname:n.enname,zhname:n.zhname})})),a}},{key:"highlightedText",value:function(e){for(var t=this.state.query.split(" ").map((function(e){return e.toLowerCase()})).filter((function(e){return e.length>0})),a=0,n=[];;){var c=t.map((function(t){return[e.toLowerCase().indexOf(t,a),t.length]})).filter((function(e){return e[0]>=0}));if(0===c.length)break;c.sort((function(e,t){return e[0]-t[0]}));var s=c[0][0],i=c[0][0]+c[0][1];n.push(r.a.createElement("span",{className:"n",key:n.length},e.slice(a,s))),n.push(r.a.createElement("span",{className:"h",key:n.length},e.slice(s,i))),a=i}return n.push(r.a.createElement("span",{className:"n",key:n.length},e.slice(a,e.length))),n}},{key:"render",value:function(){var e=this,t=this.getRegion(),a=Object(o.a)(t,2),n=a[0],c=a[1],s=this.state.search.entries.length>0||c;return r.a.createElement("div",{className:"App"},s&&r.a.createElement("div",{className:"search-header-background"}),r.a.createElement("div",{className:"app-container"},r.a.createElement("div",{className:"search-component ".concat(s?"search":"")},r.a.createElement("div",{className:"app-title"},"COVID-19 Search"),r.a.createElement("div",{className:"search-box"},r.a.createElement("input",{value:this.state.query,onChange:function(t){return e.onInputChange(t.target.value)}}),r.a.createElement("div",{className:"config-control"},r.a.createElement(E,null),r.a.createElement("div",{className:"controls"},r.a.createElement("div",{className:"control"},r.a.createElement("div",{className:"control-name block"},"Sort By"),r.a.createElement("div",{className:"options"},r.a.createElement("div",{className:"option block ".concat("score"===this.state.search.sort?"selected":""),onClick:function(){return e.setSearchSort("score")}},"Relevance"),r.a.createElement("div",{className:"option block ".concat("-date"===this.state.search.sort?"selected":""),onClick:function(){return e.setSearchSort("-date")}},"Recency"))),r.a.createElement("div",{className:"control"},r.a.createElement("div",{className:"control-name block"},"Page Size"),r.a.createElement("div",{className:"options"},r.a.createElement("div",{className:"option block ".concat(10===this.state.search.pageSize?"selected":""),onClick:function(){return e.setSearchPageSize(10)}},"10"),r.a.createElement("div",{className:"option block ".concat(20===this.state.search.pageSize?"selected":""),onClick:function(){return e.setSearchPageSize(20)}},"20"))))))),s&&r.a.createElement("div",{className:"info-box"},r.a.createElement("div",{className:"info-container"},c&&!this.state.hoverEntry&&r.a.createElement(N,{regionData:c,relatedRegions:this.getRelatedRegion(n),onSearch:function(t){return e.onInputChange(t)}}),!c&&!this.state.hoverEntry&&this.state.focusEntity&&r.a.createElement(R,{entity:this.state.focusEntity,onSearch:function(t){return e.onInputChange(t)}}),this.state.hoverEntry&&r.a.createElement(I,{entry:this.state.hoverEntry,onClose:function(){return e.setState({hoverEntry:void 0})}}))),s&&r.a.createElement("div",{className:"search-entries-container"},r.a.createElement("div",{className:"meta"},this.state.metaText),this.state.search.entries.map((function(t,a){return r.a.createElement("div",{className:"search-entries",key:a,onMouseEnter:function(){return e.setState({hoverEntry:t})}},r.a.createElement("div",{className:"entry-title"},r.a.createElement("a",{href:t.urls.length>0?t.urls[0]:"#",target:"_blank",rel:"noopener noreferrer"},e.highlightedText(t.title))),r.a.createElement("div",{className:"entry-content"},e.highlightedText(t.content)),r.a.createElement("div",{className:"entry-meta"},r.a.createElement("span",null,"Date: ",t.time.split(" ")[0].replace(/\//g,"-")),t.source&&r.a.createElement("span",null,"Source: ",t.source)))})),r.a.createElement("div",{className:"paging"},r.a.createElement("i",{onClick:function(){return e.setPage(0)},className:"fas fa-angle-double-left"}),r.a.createElement("i",{onClick:function(){return e.setPage(e.pageIndex-1)},className:"fas fa-angle-left"}),r.a.createElement("input",{value:this.pageIndex+1,onChange:function(t){""===t.target.value&&(t.target.value="1");var a=parseInt(t.target.value);isNaN(a)||e.setPage(a-1)}}),r.a.createElement("i",{onClick:function(){return e.setPage(e.pageIndex+1)},className:"fas fa-angle-right"}),r.a.createElement("i",{onClick:function(){return e.setPage(e.state.search.count/e.state.search.pageSize+1)},className:"fas fa-angle-double-right"})))))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(113);s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},52:function(e,t,a){e.exports=a(114)},57:function(e,t,a){},58:function(e,t,a){},60:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){}},[[52,1,2]]]);
//# sourceMappingURL=main.53a9ee1d.chunk.js.map