export class ErrorModel {
    private msg: string;
    private code: string;
    private category: string;
    private status: number;

    constructor(status: number, code: string, category: string, msg: string) {
        this.status = status;
        this.code = code;
        this.category = category;
        this.msg = msg;
    }

    /**
     * Getter $msg
     * @return {string}
     */
	public get $msg(): string {
		return this.msg;
	}

    /**
     * Getter $code
     * @return {string}
     */
	public get $code(): string {
		return this.code;
	}

    /**
     * Getter $category
     * @return {string}
     */
	public get $category(): string {
		return this.category;
	}

    /**
     * Getter $status
     * @return {number}
     */
	public get $status(): number {
		return this.status;
	}

    /**
     * Setter $msg
     * @param {string} value
     */
	public set $msg(value: string) {
		this.msg = value;
	}

    /**
     * Setter $code
     * @param {string} value
     */
	public set $code(value: string) {
		this.code = value;
	}

    /**
     * Setter $category
     * @param {string} value
     */
	public set $category(value: string) {
		this.category = value;
	}

    /**
     * Setter $status
     * @param {number} value
     */
	public set $status(value: number) {
		this.status = value;
	}
    

}