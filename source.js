function getAllTextNodes(){
    const nodes = [];
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while(node = walk.nextNode()) nodes.push(node);
    return nodes;
}

getAllTextNodes().forEach(el => {
    if (el.textContent.trim().length<2) return;
    if (['SCRIPT', 'STYLE'].includes(el.parentElement.tagName)) return;
    const texts = el.textContent.split(/(?<=[\s])/);
    const list = texts.flatMap(text => {
        const bold = document.createElement('bionic-text');
        bold.style.fontWeight = "bold";
        bold.innerText=text.slice(0, text.length / 2);
        const thin = document.createElement('bionic-text');
        thin.style.fontWeight = "light";
        thin.innerText = text.slice(text.length / 2);
        return [bold, thin];
    })
    el.replaceWith(...list);
})