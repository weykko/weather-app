export function scrollToLatestWidget() {
    const widgetContainer = document.getElementById('widget-container');
    widgetContainer.scrollLeft = widgetContainer.scrollWidth;
}

export function setupScrollButtons() {
    const widgetContainer = document.getElementById('widget-container');

    document.getElementById('scroll-left').addEventListener('click', () => {
        const widgetWidth = widgetContainer.firstElementChild?.offsetWidth || 0;
        widgetContainer.scrollLeft -= widgetWidth;
    });

    document.getElementById('scroll-right').addEventListener('click', () => {
        const widgetWidth = widgetContainer.firstElementChild?.offsetWidth || 0;
        widgetContainer.scrollLeft += widgetWidth;
    });
}