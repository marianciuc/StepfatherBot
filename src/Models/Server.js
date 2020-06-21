module.exports = class Server {
    constructor(guild_id, private_category_id, private_channel_id, prefix, welcome_channel_id, telegram_channel_id, log_channel_id, private_channel_limit, custom_welcome_image_url) {
        this._guild_id = guild_id;
        this._private_category_id = private_category_id;
        this._private_channel_id = private_channel_id;
        this._prefix = prefix;
        this._welcome_channel_id = welcome_channel_id;
        this._telegram_channel_id = telegram_channel_id;
        this._log_channel_id = log_channel_id;
        this._private_channel_limit = private_channel_limit;
        this._custom_welcome_image_url = custom_welcome_image_url;
    }

    get custom_welcome_image_url() {
        return this._custom_welcome_image_url;
    }

    set custom_welcome_image_url(value) {
        this._custom_welcome_image_url = value;
    }

    get guild_id() {
        return this._guild_id;
    }

    set guild_id(value) {
        this._guild_id = value;
    }

    get private_category_id() {
        return this._private_category_id;
    }

    set private_category_id(value) {
        this._private_category_id = value;
    }

    get private_channel_id() {
        return this._private_channel_id;
    }

    set private_channel_id(value) {
        this._private_channel_id = value;
    }

    get prefix() {
        return this._prefix;
    }

    set prefix(value) {
        this._prefix = value;
    }

    get welcome_channel_id() {
        return this._welcome_channel_id;
    }

    set welcome_channel_id(value) {
        this._welcome_channel_id = value;
    }

    get telegram_channel_id() {
        return this._telegram_channel_id;
    }

    set telegram_channel_id(value) {
        this._telegram_channel_id = value;
    }

    get log_channel_id() {
        return this._log_channel_id;
    }

    set log_channel_id(value) {
        this._log_channel_id = value;
    }

    get private_channel_limit() {
        return this._private_channel_limit;
    }

    set private_channel_limit(value) {
        this._private_channel_limit = value;
    }
}