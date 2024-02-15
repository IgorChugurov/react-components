import SqureButton from "./components/buttons/SqureButton";
import TagsList from "./components/tags/TagsList";
import { ITag, ITagsDataService } from "./components/tags/model/tag";
import {
  outerHandlersAdd,
  outerHandlersRemove,
} from "./components/tags/outerHandlers/outerHandlers";
export { SqureButton, TagsList };
export type { ITagsDataService, ITag };
export { outerHandlersAdd, outerHandlersRemove };
