export function saveNamedRoute(name, addresses) {
    const routes = getAllRoutes();
    routes[name] = addresses;
    localStorage.setItem("smartRoute-savedRoutes", JSON.stringify(routes));
    alert(`Route "${name}" saved!`);
}

export function getAllRoutes() {
    const data = localStorage.getItem("smartRoute-savedRoutes");
    return data ? JSON.parse(data) : {};
}

export function getRouteByName(name) {
    const routes = getAllRoutes();
    return routes[name] || null;
}

export function getRouteNames() {
    return Object.keys(getAllRoutes());
}