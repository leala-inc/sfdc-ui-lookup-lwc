function withinRange(value, a, b) {
    return a <= value && value <= b;
}
class AutoPosition {
    autoPositionUpdater;
    _root;
    _input;
    _dropdown;
    _reposition;
    constructor(scope, positioningOption) {
        this._root = scope;
        if (typeof positioningOption === 'function') {
            this._reposition = positioningOption;
        } else {
            switch (positioningOption.type) {
                case 'dropdown':
                    this._input = positioningOption.input;
                    this._dropdown = positioningOption.dropdown;
                    this._reposition = this._repositionDropdown.bind(this);
                    break;
                default:
                    break;
            }
        }
    }
    // アニメーションループ開始
    start() {
        this._reposition(this._root);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.autoPositionUpdater = window.requestAnimationFrame(this.update.bind(this));
    }

    // 各アニメーション対象に更新を通知
    update() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.autoPositionUpdater = window.requestAnimationFrame(this.update.bind(this));
        // positioning
        this._reposition(this._root);
    }

    stop() {
        window.cancelAnimationFrame(this.autoPositionUpdater);
    }

    _repositionDropdown() {
        const input = this._input.getBoundingClientRect();
        const dropdown = this._dropdown.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const bottomSpaceHeight = windowHeight - input.bottom;
        this._dropdown.style.left = input.left + 'px';
        this._dropdown.style.width = input.width + 'px';
        if (withinRange(dropdown.height, bottomSpaceHeight, input.top)) {
            this._dropdown.style.top = input.top - dropdown.height - 3 + 'px';
        } else {
            this._dropdown.style.top = input.bottom + 'px';
        }
    }
}

export function startPositioning(scope, positioningOption) {
    const instance = new AutoPosition(scope, positioningOption);
    instance.start();
    return instance;
}

export function stopPositioning(autoPosition) {
    if (autoPosition) {
        autoPosition.stop();
    }
}
