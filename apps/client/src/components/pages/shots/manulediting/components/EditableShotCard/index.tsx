import { useUser } from '@client/hooks';
import { ArchiveTick, Edit2, GalleryTick } from 'iconsax-react';
import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';
import { IProps } from './type';

export const EditableShotCard: FC<IProps> = ({
  content,
  title,
  onEdit,
  onSave,
  disabled,
  id,
}) => {
  const user = useUser();

  const [form, setForm] = useState({
    title,
    content,
  });

  const [allowEdit, setAllowEdit] = useState(false);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (eve) => {
    const { value, name } = eve.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit: MouseEventHandler<HTMLButtonElement> = (eve) => {
    eve.preventDefault();
    eve.stopPropagation();
    setAllowEdit(true);
    onEdit(id);
  };
  const handleSave: MouseEventHandler<HTMLButtonElement> = (eve) => {
    eve.preventDefault();
    eve.stopPropagation();
    setAllowEdit(false);
    onSave(id);
  };

  return (
    <div
      className={`w-[400px] bg-white shadow-md shadow-slate-900/5 h-[400px] aspect-square border rounded-lg rouned-lg whitespace-nowrap flex flex-col ${
        disabled ? 'blur-md disabled:cursor-not-allowed' : ''
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
        <button onClick={allowEdit ? handleSave : handleEdit}>
          {allowEdit ? (
            <ArchiveTick
              size={16}
              variant="Bulk"
              color="#22c55e"
              className="animate-pulse"
            />
          ) : (
            <Edit2 size={16} variant="Bulk" color="#64748b" />
          )}
        </button>
      </header>
      <form id="content" className="px-3 mt-2">
        <input
          disabled={!allowEdit}
          type="text"
          value={form.title}
          className="block w-full text-lg text-slate-800 disabled:bg-transparent"
          name="title"
          onChange={handleChange}
        />
        <textarea
          disabled={!allowEdit}
          value={form.content}
          className="w-full mt-2 text-sm resize-none focus:outline-none disabled:bg-transparent"
          rows={5}
          name="content"
          onChange={handleChange}
        />
      </form>
      <div id="img" className="flex-1 p-3 overflow-hidden">
        <div className="w-full h-full filter blur-md bg-gray-50 rounded-md flex items-center justify-center">
          <GalleryTick variant="Bulk" size={64} color="#0f172a80" />
        </div>
      </div>
    </div>
  );
};
