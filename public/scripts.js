function searchPosts() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const postCards = document.querySelectorAll('.post-card');
  
    postCards.forEach(postCard => {
      const title = postCard.querySelector('h2').innerText.toLowerCase();
      const summary = postCard.querySelector('p').innerText.toLowerCase();
      
      if (title.includes(input) || summary.includes(input)) {
        postCard.style.display = 'block';
      } else {
        postCard.style.display = 'none';
      }
    });
  }
  