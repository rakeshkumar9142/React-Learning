function customRender(reactElement,container) {
    /*
    const domelement = document.createElement
    (reactElement.type)
    domelement.innerHTML = reactElement.children
    domelement.setAttribute('href',reactElement.props.href)
    domelement.setAttribute('target',reactElement.props.target)
    container.appendChild(domelement)
  */

    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;
    for (const prop in reactElement.props) {
        if (prop === 'children')  continue;
       domElement.setAttribute(prop,reactElement.props[prop])
    }
   container.appendChild(domElement)
}


const reactElement  = {
    type : "a",
    props : {
        href : 'https://google.com',
        target : '_blank',
    },
    children : 'Click me to visit Google'
}


const mainContainer = document.querySelector('#root');

customRender(reactElement,mainContainer)

