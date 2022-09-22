import { Vec4 } from "@david.harwardt/math";

function clamp(v: number, min: number, max: number) { return Math.min(Math.max(v, min), max) }

class Color {
    public static get black()   { return new Color(0, 0, 0) }
    public static get white()   { return new Color(1, 1, 1) }
    public static get red()     { return new Color(1, 0, 0) }
    public static get green()   { return new Color(0, 1, 0) }
    public static get blue()    { return new Color(0, 0, 1) }

    private v: Vec4;

    constructor(r: number, g: number, b: number, a: number = 1.0) {
        this.v = new Vec4(r, g, b, a);
    }

    public static hex(v: string | number): Color {
        if (typeof v === "number") {
            return new Color(((v >> 8 * 2) & 0xff) / 0xff, ((v >> 8 * 1) & 0xff) / 0xff, ((v >> 8 * 0) & 0xff) / 0xff);
        }

        if(!v.startsWith("#") || v.length !== 7 && v.length !== 9) throw new Error("invalid color string");

        let colors: number[] = new Array((v.length - 1) / 2);
        for(let i = 0; i < (v.length - 1) / 2; i++) {
            colors[i] = parseInt(v.substring(2 * i + 1, 2 * i + 3), 16) / 255;
        }
        return new Color(colors[0], colors[1], colors[2], colors?.[3]);
    }

    public static hsl(h: number, s: number, l: number) {

    }

    public static vec(v: Vec4) { return new Color(v.x, v.y, v.z, v.w) }

    private hexComponent(v: number) { return Math.floor(clamp(v, 0.0, 1.0) * 255).toString(16).padStart(2, "0") }
    public toRgbString(includeAlpha: boolean = this.a !== 1.0) {
        return `rgb${includeAlpha ? "a" : ""}(${Math.floor(this.r * 255)}, ${Math.floor(this.g * 255)}, ${Math.floor(this.b * 255)}${includeAlpha ? ", " + Math.floor(this.a * 255) : ""})`
    }
    public toHexString(includeAlpha: boolean = this.a !== 1.0) {
        return `#${this.hexComponent(this.r)}${this.hexComponent(this.g)}${this.hexComponent(this.b)}${includeAlpha ? this.hexComponent(this.a) : ""}`
    }
    public toString() { return this.toHexString() }
    public toVec() { return this.v.copy() }
    public toArray() { return this.v.toArray() }

    public mix(color: Color, v: number = 0.5) {
        const res = new Color(0, 0, 0, 0);
        res.v = this.v.multS(v).add(color.v.multS(1 - v));
        return res
    }

    public withAlpha(a: number): Color {
        const res =this.clone();
        res.a = a;
        return res
    }

    public get r(): number { return this.v.x }
    public get g(): number { return this.v.y }
    public get b(): number { return this.v.z }
    public get a(): number { return this.v.w }

    public set r(v: number) { this.v.x = v }
    public set g(v: number) { this.v.y = v }
    public set b(v: number) { this.v.z = v }
    public set a(v: number) { this.v.w = v }

    public clone() {
        return new Color(this.r, this.g, this.b, this.a)
    }
}

export {
    Color,
}
