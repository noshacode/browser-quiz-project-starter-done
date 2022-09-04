export const createHintElement = (explain, text, href) => {
  const element = document.createElement('p');

  const closeElement = document.createElement('span');
  closeElement.textContent = 'X ';
  closeElement.id = 'close-element';

  element.appendChild(closeElement);

  element.innerHTML += String.raw`
      <br>
      ${explain}
      <hr>
      <br>
      See the link below:
      <br>
      ${text}: ${href}
    `;
  element.style.position = "absolute";
  element.style.top = "25px";
  element.style.left = "26%";
  element.style.width = "450px";
  element.style.height = "575px";
  element.style.color = "white";
  element.style.background = "rgb(88, 100, 91, .9)";
  element.style.padding = "10px";
  element.style.lineHeight = "40px";

  return element;
};