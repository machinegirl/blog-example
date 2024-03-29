(() => {

  function getBlogPostsConf() {
    return fetch('blog-posts.conf')
    .then(res => {
      return res.text();
    })
    .then(res => {
      return(res.split('\n'));
    });
  
  }

  function makePostsHtml(posts) {
    return posts.map(v => {
      return '<div class="blog-post">' + marked(v) + '</div>'
    }).join('\n');
  }

  let md = document.getElementById('markdown-area');
  getBlogPostsConf()
  .then(fileNames => {
    let fileNamesF = fileNames.filter(v => v !== '');
    Promise.all(fileNamesF.map(f => {
      return fetch('blog-posts/' + f)
    }))
    .then(responses => Promise.all(responses.map(res => res.text()))
    ).then(posts => {
      md.innerHTML = makePostsHtml(posts);
    });
  });

})();