import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appType]'
})
export class TypeDirective {
    colors = {
        bug: '#92BC2C',
        fire: '#FBA54C',
        normal: '#A0A29F',
        dark: '#595761',
        flying: '#A1BBEC',
        poison: '#B763CF',
        dragon: '#0C69C8',
        ghost: '#5F6DBC',
        psychic: '#FA8581',
        electric: '#F2D94E',
        grass: '#5FBD58',
        rock: '#C9BB8A',
        fairy: '#EE90E6',
        ground: '#DA7C4D',
        steel: '#5695A3',
        fighting: '#D3425F',
        ice: '#75D0C1',
        water: '#539DDF'
    }
    tooltip: HTMLElement

    constructor(private elRef: ElementRef, private renderer: Renderer2) { }

    createTooltip(): HTMLElement {
        const tooltip = this.renderer.createElement('div')
        const img = this.renderer.createElement('img')
        const type = this.elRef.nativeElement.textContent.toLowerCase()
        const elRefRect = this.elRef.nativeElement.getBoundingClientRect();
        const tooltipTop = elRefRect.top + window.scrollY;
        const tooltipLeft = elRefRect.right + window.scrollX;
        this.renderer.appendChild(tooltip, img)
        this.renderer.setStyle(tooltip, 'position', 'absolute')
        this.renderer.setStyle(tooltip, 'width', '24px')
        this.renderer.setStyle(tooltip, 'height', '24px')
        this.renderer.setStyle(tooltip, 'display', 'flex')
        this.renderer.setStyle(tooltip, 'align-items', 'center')
        this.renderer.setStyle(tooltip, 'justify-content', 'center')
        this.renderer.setStyle(tooltip, 'top', `${tooltipTop}px`);
        this.renderer.setStyle(tooltip, 'left', `${tooltipLeft + 3}px`);
        this.renderer.setStyle(tooltip, 'background-color', this.colors[type])
        this.renderer.setStyle(tooltip, 'border-radius', '50%')
        this.renderer.setStyle(img, 'width', '14px')
        this.renderer.setStyle(img, 'height', '14px')
        this.renderer.setAttribute(img, 'src', `assets/svg/${type}.svg`)
        this.renderer.appendChild(tooltip, img)
        return tooltip
    }

    @HostListener('mouseover') onMouseOver() {
        this.tooltip = this.createTooltip()
        const type = this.elRef.nativeElement.textContent.toLowerCase()
        this.renderer.appendChild(this.elRef.nativeElement, this.tooltip)
    }

    @HostListener('mouseout') onMouseOut() {
        this.renderer.removeChild(this.elRef.nativeElement, this.tooltip)
    }
}