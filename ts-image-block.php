<?php
/**
 * Plugin Name:       Ts Image Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ts-image-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


function custom_image_block_enqueue_scripts() {
    wp_enqueue_script(
        'custom-image-block-js', 
        plugins_url('/src/index.js', __FILE__), 
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), 
        true
    );
}

add_action('enqueue_block_editor_assets', 'custom_image_block_enqueue_scripts');

function custom_image_block_register_block() {
    register_block_type('custom/image-block', array(
        'render_callback' => 'custom_image_block_render_callback',
    ));
}

add_action('init', 'custom_image_block_register_block');

function custom_image_block_render_callback($attributes) {
    if (empty($attributes['url'])) {
        return '';
    }

    // Assuming you have a lightbox library that works via data attributes
    return sprintf(
        '<a href="%s" class="spotlight"><img src="%s" alt="%s"></a>',
        esc_url($attributes['url']),
        esc_url($attributes['url']),
        esc_attr($attributes['alt'])
    );
}
