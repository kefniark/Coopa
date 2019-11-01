import * as mat4 from "../gl-matrix/mat4"
import * as vec3 from "../gl-matrix/vec3"
import * as quat from "../gl-matrix/quat"
import { onChange } from "../../onchange"
import { forEach, roundTo } from "../gl-matrix/common"
import { IVector3 } from "./common"

export class Transform3d {
	public data: number[]

	private _position: number[]
	private _posProxy: IVector3

	private _rotQuat: number[]
	private _rotProxy: IVector3

	private _scale: number[]
	private _scaleProxy: IVector3

	get position() {
		return this._posProxy
	}

	get scale() {
		return this._scaleProxy
	}

	get rotation() {
		return this._rotProxy
	}

	constructor(position?: number[], rotation?: number[], scale?: number[]) {
		this.data = mat4.create()

		this._position = position || vec3.create()
		this._rotQuat = rotation || quat.create()
		this._scale = scale || vec3.create()

		this.getPosition()
		this.getRotation()
		this.getScale()

		this.refresh()
	}

	private getPosition() {
		mat4.getTranslation(this._position, this.data)
		const mat = { x: this._position[0], y: this._position[1], z: this._position[2] } as IVector3
		this._posProxy = onChange(mat, () => this.setPosition(mat.x, mat.y, mat.z))
	}

	private setPosition(x: number = 0, y: number = 0, z: number = 0) {
		vec3.set(this._position, x, y, z)
		this.refresh()
	}

	private getScale() {
		mat4.getScaling(this._scale, this.data)
		const mat = { x: this._scale[0], y: this._scale[1], z: this._scale[2] } as IVector3
		this._scaleProxy = onChange(mat, () => this.setScale(mat.x, mat.y, mat.z))
	}

	private setScale(x: number = 1, y: number = 1, z: number = 1) {
		vec3.set(this._scale, x, y, z)
		this.refresh()
	}

	private getRotation() {
		mat4.getRotation(this._rotQuat, this.data)

		const mat = { x: this._rotQuat[0], y: this._rotQuat[1], z: this._rotQuat[2] } as IVector3
		this._rotProxy = onChange(mat, () => this.setRotation(mat.x, mat.y, mat.z))
	}

	private setRotation(x: number, y: number, z: number) {
		quat.fromEuler(this._rotQuat, x, y, z)
		this.refresh()
	}

	private refresh() {
		mat4.fromRotationTranslationScale(this.data, this._rotQuat, this._position, this._scale)
	}

	toCss() {
		const data = mat4.clone(this.data)
		forEach(data, (_index, value) => roundTo(value, 3))
		return `matrix3d(${data.join(", ")})`
	}
}
