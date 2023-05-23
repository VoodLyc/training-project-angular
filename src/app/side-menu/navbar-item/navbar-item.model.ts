export class NavbarItem {
    constructor(public label: string, public icon: string, public url?: any[]) {}

    setUrl(url: any[]): void {
        this.url = url
    }
}