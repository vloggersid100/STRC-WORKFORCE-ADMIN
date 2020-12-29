/*
<username> must be provided without "@"
<container> is query to the parent element for inserting feed into it
<items> is unnecesary number used as maximum count of requested media
*/
function getInstagramFeed(username, container, items) {
  if(!$(container).length)
    return false;
  items = items || 32;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState==4 && xmlhttp.status==200) {
      data = xmlhttp.responseText;
      data = data.split("window._sharedData = ");
      data = data[1].split("<\/script>");
      data = data[0];
      data = data.substr(0, data.length-1);
      data = JSON.parse(data);
      data = data.entry_data.ProfilePage[0].graphql.user;
      if(data.is_private) {
        console.log('This account is private');
        return false;
      }
      else {
        var imgs = data.edge_owner_to_timeline_media.edges;
        max = (imgs.length>items) ? items : imgs.length;
        if(!max)
          return false;
        var html = "<div class='ig-wrapper'><div class='ig-container'>";
        for(var i=0; i<max; i++) {
          var url = "https://www.instagram.com/p/"+ imgs[i].node.shortcode +"/";
          var type = "";
          if(imgs[i].node.__typename=="GraphVideo")
            type = " class='video'";
          else if(imgs[i].node.__typename=="GraphSidecar")
            type = " class='series'";
          var caption = imgs[i].node.edge_media_to_caption.edges[0].node.text;
          caption = caption.replace(/#/g," #");
          caption = caption.replace(/(•\n)|#(.+?)(?=[\s.,:,]|$)/g, "");
          caption = caption.replace(/\n/g,"<br/>");
          caption = caption.replace(/[\s]{2,}/g," ");
          caption = caption.trim();
          if(caption)
            caption = "<span>"+ caption +"</span>\n";
          html += "<a href='"+ url +"' target='_blank'"+ type +">";
          html += "<img src='"+ imgs[i].node.thumbnail_resources[2].src +"' alt='"+ username +" instagram image "+ i+"' />";
          html += '';
          html += "</a>";
        }
        html += "</div></div>";
      }
      $(container).html(html);
    }
  }
  xmlhttp.open("GET", "https://www.instagram.com/"+ username +"/", true);
  xmlhttp.send();
}


getInstagramFeed("petermckinnon", "#instagramfeed", 1);