(function () {
  function getAllTextNodes() {
    const nodes = [];
    const walk = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    let node;
    while ((node = walk.nextNode())) nodes.push(node);
    return nodes;
  }
  let style = document.getElementById('biotic-text')
  if (!style){
    style = document.createElement("style");
    style.id = "biotic-text"
    document.head.appendChild(style);
  }
  window.biotic_mode = ((window.biotic_mode || 0) + 1) % 4;

  style.textContent = `
    biotic-bold { font-weight: bold; }
    biotic-light { font-weight: light; }
  `
  switch (window.biotic_mode) {
    case 0:
      break;
    case 1:
      style.textContent+= `
        biotic-bold, biotic-light { 
          font-family: 'Inter', sans-serif !important;
        }
      `
      break;
    case 2:
      style.textContent+= `
        biotic-bold, biotic-light { 
          font-family: 'Inter', sans-serif !important;
          letter-spacing: 0.04mm !important;
        }
      `
      break;
    case 3:
      style.textContent+= `
        biotic-bold, biotic-light { 
          font-family: 'Inter', sans-serif !important;
          letter-spacing: 0.04mm !important;
          line-height: 183%; !important;
        }
      `
      break;
  }

  
  const oldEls = Array.from(document.querySelectorAll("biotic-bold, biotic-light"))
  for (let i = 0; i< oldEls.length;i+=2){
      const bold = oldEls[i]
      const light = oldEls[i+1]
      bold.replaceWith(bold.innerText+light.innerText)
      light.remove()
  }

  if (window.biotic_mode == 0) return;
  getAllTextNodes().forEach((el) => {
    if (el.textContent.trim().length < 2) return;
    if (["SCRIPT", "STYLE"].includes(el.parentElement.tagName)) return;
    const texts = el.textContent.split(/(?<=[\s])/);
    const list = texts.flatMap((text) => {
      const bold = document.createElement("biotic-bold")
      bold.innerText = text.slice(0, text.length / 2);
      const light = document.createElement("biotic-light")
      light.innerText = text.slice(text.length / 2);
      return [bold, light];
    });
    el.replaceWith(...list);
  });
})();
