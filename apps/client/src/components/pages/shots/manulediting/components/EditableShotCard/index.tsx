import Editor from '@client/components/ui/Editor';
import { useUser } from '@client/hooks';
import { shotsApi } from '@client/store/services/shot';
import { useDebounceCallback } from '@react-hook/debounce';
import { Editor as EditorClass } from '@tiptap/react';
import { GalleryTick } from 'iconsax-react';
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  MutableRefObject,
  useRef,
  useState,
} from 'react';
import { useSwiper } from 'swiper/react';
import { ScheduleNotifier } from './ScheduleNotifier';
import { ShotController } from './ShotController';
import { IProps } from './type';

export const EditableShotCard: FC<IProps> = ({
  content,
  title,
  onEdit,
  onSave,
  disabled,
  id,
  isActive,
}) => {
  const user = useUser();

  const [form, setForm] = useState({
    title,
    content,
  });

  const [allowEdit, setAllowEdit] = useState(false);
  const swiper = useSwiper();
  const editorRef = useRef() as MutableRefObject<EditorClass>;
  const [updateShot] = shotsApi.useUpdateShotMutation();
  const updateShotAsync = useDebounceCallback(updateShot, 500, false);

  const handleEdit: MouseEventHandler<HTMLButtonElement> = (eve) => {
    eve.preventDefault();
    eve.stopPropagation();
    setAllowEdit(true);
    onEdit(id);
    swiper.disable();
    swiper.isLocked = true;
    editorRef.current.setEditable(true);
  };
  const handleSave: MouseEventHandler<HTMLButtonElement> = (eve) => {
    eve.preventDefault();
    eve.stopPropagation();
    setAllowEdit(false);
    onSave(id);
    swiper.enable();
    swiper.isLocked = false;
    editorRef.current.setEditable(false);
  };

  const handleChangeTitle: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = async (eve) => {
    const { value, name } = eve.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
    await updateShotAsync({
      shotId: id,
      shotInput: {
        title: value,
      },
    });
  };

  const handleChangeShotContent = async (content: string) => {
    setForm((prevState) => ({ ...prevState, content }));
    await updateShotAsync({
      shotId: id,
      shotInput: {
        content,
      },
    });
  };

  return (
    <div>
      <ShotController
        isActive={isActive}
        shotId={id}
        allowEdit={allowEdit}
        onSave={handleSave}
        onEdit={handleEdit}
      />
      <div
        className={`bg-white shadow-md shadow-slate-900/5 aspect-square border rounded-lg rouned-lg whitespace-nowrap flex flex-col ${
          disabled || !isActive
            ? 'filter grayscale disabled:cursor-not-allowed opacity-40'
            : ''
        }`}
        id={id}
      >
        <header className="px-3 pt-3 flex justify-between items-start">
          <div id="user_dtl" className="flex items-center space-x-2">
            <div className="w-12 h-12 relative overflow-hidden rounded-full border p-1">
              <img src={user?.profilePic} alt="user_profie_pic" />
            </div>
            <div>
              <p className="text-slate-700 font-semibold text-sm">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-400/90">{user?.about}</p>
            </div>
          </div>
        </header>
        <form id="content" className="px-3 mt-2">
          <input
            disabled={!allowEdit}
            type="text"
            value={form.title}
            className="block w-full text-lg text-slate-800 disabled:bg-transparent"
            name="title"
            onChange={handleChangeTitle}
          />
          <Editor
            content={form.content}
            floatingMenu
            bubbleMenu
            isEditable={allowEdit}
            ref={editorRef}
            onChangeRichTextContent={handleChangeShotContent}
            className="mt-2"
          />
        </form>
        <div id="img" className="flex-1 p-3 overflow-hidden">
          <div className="w-full h-full filter blur-md bg-gray-50 rounded-md flex items-center justify-center">
            <GalleryTick variant="Bulk" size={64} color="#0f172a80" />
          </div>
        </div>
      </div>
      <ScheduleNotifier shotId={id} disabled={disabled} />
    </div>
  );
};
