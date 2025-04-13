const STORAGE_KEY = "smartRoute-savedRoutes";

export function saveNamedRoute(name, addresses) {
    const routes = getAllRoutes();
    routes[name] = addresses;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
    alert(`Route "${name}" saved!`);
}

export function getAllRoutes() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
}

export function getRouteByName(name) {
    const routes = getAllRoutes();
    return routes[name] || null;
}

export function getRouteNames() {
    return Object.keys(getAllRoutes());
}