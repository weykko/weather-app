export function scrollToLatestWidget() {
    const widgetContainer = document.getElementById('widget-container');
    widgetContainer.scrollLeft = widgetContainer.scrollWidth;
}