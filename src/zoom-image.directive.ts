import {
    Directive,
    ElementRef,
    Input,
    HostListener,
    OnChanges,
    SimpleChanges,
    Renderer2
} from '@angular/core';

@Directive({ selector: '[zoomImage]' })
export class ZoomImageDirective implements OnChanges {
    @Input() imgSrc: string;
    @Input() zoomImage: string;
    @Input() len: {'z-index': number, 'background-color': string} = {'z-index': 999, 'background-color': ''};

    private imageZoomLen: HTMLDivElement;
    private zoomImg: HTMLImageElement;
    private isZooming = false;
    private imgLoaded = false;
    private zoomImgLoaded = false;
    private widthRatio: number;
    private heightRatio: number;

    private currentEvent: MouseEvent;

    constructor(private readonly element: ElementRef, private readonly renderer: Renderer2) {
        const container = this.renderer.createElement('div');
        this.renderer.setStyle(container, 'position', 'relative');
        this.renderer.insertBefore(this.element.nativeElement.parentNode, container, this.element.nativeElement);
        this.renderer.removeChild(this.element.nativeElement.parentNode, this.element.nativeElement);
        this.renderer.appendChild(container, this.element.nativeElement);

        this.imageZoomLen = this.renderer.createElement('div');
        this.imageZoomLen.onmousemove = ($event) => this.onMouseMove($event);
        this.imageZoomLen.onmouseleave = ($event) => this.onMouseLeave($event);
        this.renderer.setStyle(this.imageZoomLen, 'position', 'absolute');
        this.renderer.setStyle(this.imageZoomLen, 'display', 'none');
        this.renderer.setStyle(this.imageZoomLen, 'z-index', this.len['z-index']);
        this.renderer.setStyle(this.imageZoomLen, 'background-color', this.len['background-color']);
        this.renderer.insertBefore(container, this.imageZoomLen, this.element.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['imgSrc'] || changes['zoomImage']) {
            this.initImage();
        }
    }

    initImage() {
        this.imgLoaded = false;
        this.zoomImgLoaded = false;

        // if (!!this.imageZoomLen) {
        //     this.renderer.removeStyle(this.imageZoomLen, 'background-image');
        // }
        if (this.element.nativeElement instanceof HTMLImageElement) {
            const element = this.element.nativeElement;
            this.zoomImg = new Image();

            element.onload = () => {
                // console.log('origin img loaded');
                this.imgLoaded = true;
                this.setRatio();
            };
            this.zoomImg.onload = () => {
                // console.log('zoom img loaded');
                this.zoomImgLoaded = true;
                this.setRatio();
                this.renderer.setStyle(this.imageZoomLen, 'background-image', `url("${this.zoomImage}")`);
            };
            element.src = this.imgSrc;
            this.zoomImg.src = this.zoomImage;
        }
    }

    setRatio() {
        if (this.imgLoaded && this.zoomImgLoaded) {

            this.widthRatio = (this.zoomImg.width - this.element.nativeElement.width) / this.element.nativeElement.width;
            this.heightRatio = (this.zoomImg.height - this.element.nativeElement.height) / this.element.nativeElement.height;

            // console.log('zoom width: ' + this.zoomImg.width);
            // console.log('ori width: ' + this.element.nativeElement.width);

            this.renderer.setStyle(this.imageZoomLen, 'background-size', `${this.zoomImg.width}px ${this.zoomImg.height}px`);
            this.renderer.setStyle(this.imageZoomLen, 'width', this.element.nativeElement.width + 'px');
            this.renderer.setStyle(this.imageZoomLen, 'height', this.element.nativeElement.height + 'px');
        }
    }

    setLensVisibility(visible: boolean) {
        if (!!this.imageZoomLen) {
            this.renderer.setStyle(this.imageZoomLen, 'display', visible ? 'block' : 'none');
        }
    }

    @HostListener('mouseenter', ['$event'])
    onMouseEnter(event: MouseEvent) {
        this.currentEvent = event;
        if (this.currentEvent.type === 'mouseenter') {
            this.setLensVisibility(true);
        }
    }

    // @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.currentEvent = event;
        if (this.currentEvent.type === 'mousemove') {
            const container = this.element.nativeElement.parentNode;

            this.renderer.setStyle(this.imageZoomLen, "background-position", // tslint:disable-next-line:max-line-length
                `-${(event.clientX - container.offsetLeft) * this.widthRatio}px -${(event.clientY - this.element.nativeElement.y) * this.heightRatio}px`);
        }
    }

    // @HostListener('mouseleave', ['$event'])
    onMouseLeave(event: MouseEvent) {
        this.currentEvent = event;
        if (this.currentEvent.type === 'mouseleave') {
            this.setLensVisibility(false);
        }
    }

    @HostListener('window:resize')
    onWindowResize() {
        this.setRatio();
    }
}
