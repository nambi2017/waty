import {pageType} from './documents/page'
import {colorThemeType} from './documents/colorTheme'
import {portableTextType} from './portableText/portableTextType'
import { portableTextSimpleType } from './portableText/portableTextSimpleType'
import { watYLearn} from './documents/watYLearn'
import { headerType } from './documents/categories/header'
import { aboutType } from './documents/categories/about'
import { galleryType } from './documents/categories/gallery'
import { visionType } from './documents/categories/vision'
import { eventsType } from './documents/categories/events'
import { courseType } from './documents/categories/course'
import { testimonialsType } from './documents/categories/testimonials'
import { settings } from './documents/settings'
import { formType } from './documents/categories/form'


const documents = [settings, watYLearn, aboutType, galleryType, visionType, eventsType,
       courseType, testimonialsType, headerType, pageType, formType]

const blocks = [portableTextType, portableTextSimpleType]

export const schemaTypes = [...blocks, ...documents]
