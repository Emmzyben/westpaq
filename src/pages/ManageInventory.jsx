import { useState } from "react";
import { X, Trash2, Edit2 } from "lucide-react";
import { C } from "../theme/tokens";
import { Btn } from "../components/Btn";
import { CatIcon } from "../components/CatIcon";
import { useDialog } from "../context/DialogContext";

export default function ManageInventory({ categories, setCategories, fieldSchemas, setFieldSchemas, equipment, openAddEquipment }) {
  const { toast, showAlert, showConfirm } = useDialog();
  const [newCat, setNewCat] = useState({ name: "", desc: "", img: "", fields: [] });
  const [newField, setNewField] = useState("");
  const [editingCatId, setEditingCatId] = useState(null);

  const handleCatImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCat(prev => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCat = (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    const newId = editingCatId || newCat.name.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (!editingCatId && categories.some(c => c.id === newId)) {
      showAlert("A category with this name already exists. Please choose a different name.");
      return;
    }

    const generatedFields = newCat.fields.map(f => [
      f.trim().toLowerCase().replace(/[^a-z0-9]/g, ''),
      f.trim()
    ]);

    if (editingCatId) {
      setCategories(categories.map(c => c.id === editingCatId ? { ...c, name: newCat.name.trim(), desc: newCat.desc.trim(), img: newCat.img.trim() } : c));
    } else {
      setCategories([...categories, { id: newId, name: newCat.name.trim(), desc: newCat.desc.trim(), img: newCat.img.trim() }]);
    }

    setFieldSchemas(prev => ({ ...prev, [newId]: generatedFields }));
    setNewCat({ name: "", desc: "", img: "", fields: [] });
    setEditingCatId(null);
    toast(editingCatId ? "Category updated successfully." : "New category created.", { type: "success", title: editingCatId ? "Updated" : "Created" });
  };

  const handleEditCat = (cat) => {
    setEditingCatId(cat.id);
    const existingFields = fieldSchemas[cat.id] || [];
    setNewCat({
      name: cat.name,
      desc: cat.desc,
      img: cat.img || "",
      fields: existingFields.map(f => f[1])
    });
  };

  const handleDeleteCat = async (catId) => {
    const hasEquipment = equipment.some(e => e.cat === catId);
    if (hasEquipment) {
      await showAlert("Cannot delete this category because it still has equipment assigned. Please reassign or delete the equipment first.");
      return;
    }

    const confirmed = await showConfirm("Are you sure you want to delete this category? This action cannot be undone.", { danger: true });
    if (confirmed) {
      setCategories(categories.filter(c => c.id !== catId));
      const updatedSchemas = { ...fieldSchemas };
      delete updatedSchemas[catId];
      setFieldSchemas(updatedSchemas);

      if (editingCatId === catId) {
        setEditingCatId(null);
        setNewCat({ name: "", desc: "", img: "", fields: [] });
      }
      toast("Category deleted.", { type: "success", title: "Deleted" });
    }
  };

  const addField = () => {
    if (newField.trim() && !newCat.fields.includes(newField.trim())) {
      setNewCat({ ...newCat, fields: [...newCat.fields, newField.trim()] });
      setNewField("");
    }
  };

  const removeField = (f) => {
    setNewCat({ ...newCat, fields: newCat.fields.filter(field => field !== f) });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Inventory Categories</h1>
        <p className="text-sm mt-1.5 max-w-xl" style={{ color: C.ink2 }}>
          Create and manage custom equipment categories.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-lg mb-3">Existing Categories</h3>
          {categories.map(c => (
            <div key={c.id} className="bg-white p-4 rounded-2xl border flex items-center justify-between" style={{ borderColor: C.border }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: `${C.red}1A` }}>
                  {c.img ? (
                    <img src={c.img} className="w-full h-full object-cover" alt={c.name} />
                  ) : (
                    <CatIcon cat={c.id} size={24} color={C.redText} />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-base">{c.name}</h4>
                  <p className="text-xs mt-0.5" style={{ color: C.ink3 }}>{c.desc || "No description provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEditCat(c)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 border hover:bg-gray-100" style={{ borderColor: C.border }}>
                  <Edit2 size={14} color={C.ink2} />
                </button>
                <button onClick={() => handleDeleteCat(c.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 border hover:bg-red-50" style={{ borderColor: C.border }}>
                  <Trash2 size={14} color={C.red} />
                </button>
                <Btn variant="ghost" small onClick={() => openAddEquipment(c.id)}>+ Add Equipment</Btn>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-white p-5 rounded-2xl border sticky top-24" style={{ borderColor: C.border }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{editingCatId ? "Edit Category" : "Create New Category"}</h3>
              {editingCatId && (
                <button onClick={() => { setEditingCatId(null); setNewCat({ name: "", desc: "", img: "", fields: [] }); }} className="text-xs font-bold hover:underline" style={{ color: C.ink3 }}>
                  Cancel
                </button>
              )}
            </div>
            <form onSubmit={handleSaveCat} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Category Name</label>
                <input
                  required
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  placeholder="e.g. Power Tools"
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm"
                  style={{ border: `1px solid ${C.border}` }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Description</label>
                <textarea
                  required
                  value={newCat.desc}
                  onChange={(e) => setNewCat({ ...newCat, desc: e.target.value })}
                  placeholder="What items go here?"
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm min-h-[80px]"
                  style={{ border: `1px solid ${C.border}` }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Category Image (Optional)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCatImageUpload}
                    className="flex-1 px-3.5 py-2.5 rounded-lg text-sm"
                    style={{ border: `1px solid ${C.border}` }}
                  />
                  {newCat.img && (
                    <img src={newCat.img} alt="Preview" className="h-10 w-10 object-cover rounded-lg border" style={{ borderColor: C.border }} />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Custom Fields</label>
                <div className="space-y-2 mb-2">
                  {newCat.fields.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg text-sm border" style={{ borderColor: C.border }}>
                      <span>{f}</span>
                      <button type="button" onClick={() => removeField(f)} className="text-gray-400 hover:text-red-500">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={newField}
                    onChange={(e) => setNewField(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addField(); } }}
                    placeholder="e.g. Dimensions"
                    className="flex-1 px-3.5 py-2.5 rounded-lg text-sm"
                    style={{ border: `1px solid ${C.border}` }}
                  />
                  <Btn variant="dark" type="button" onClick={addField}>Add</Btn>
                </div>
                <p className="text-xs mt-1.5" style={{ color: C.ink3 }}>These fields will be requested when adding new equipment to this category.</p>
              </div>

              <Btn variant="primary" full type="submit">{editingCatId ? "Save Changes" : "Create Category"}</Btn>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
