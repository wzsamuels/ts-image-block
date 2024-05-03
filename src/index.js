import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

const enableLightboxOnImage = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/image') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes, isSelected } = props;
        const { enableLightbox } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                {isSelected && (
                    <InspectorControls>
                        <PanelBody title="Lightbox Settings">
                            <ToggleControl
                                label="Enable Lightbox"
                                checked={enableLightbox}
                                onChange={() => setAttributes({ enableLightbox: !enableLightbox })}
                            />
                        </PanelBody>
                    </InspectorControls>
                )}
            </Fragment>
        );
    };
}, 'enableLightboxOnImage');

addFilter('editor.BlockEdit', 'custom/enable-lightbox-on-image', enableLightboxOnImage);

function addLightboxAttribute(settings, name) {
    if (name === 'core/image') {
        if (!settings.attributes) {
            settings.attributes = {};
        }
        settings.attributes.enableLightbox = {
            type: 'boolean',
            default: false,
        };
    }
    return settings;
}

addFilter('blocks.registerBlockType', 'custom/add-lightbox-attribute', addLightboxAttribute);