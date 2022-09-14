import { useFormik } from "formik";
import { LoadingButton } from "ui";
import { AvatarUpload } from "./avatar-upload";

export const TeamMemberForm: React.FC<IAddEditTeamMember> = ({
  header,
  initialData,
  loading,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: (values) => {
      onSubmit(values, () => formik.resetForm());
    },
  });
  return (
    <>
      <div className="mt-2">
        <h3 className="text-lg font-medium leading-6 text-gray-200">
          {header ? header : "New Team Member"}
        </h3>
        <div className="mt-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-gray-700 px-4 py-5 sm:p-6">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Avatar
                  </label>
                  <AvatarUpload />
                  <p className="mt-2 text-sm text-gray-400">
                    Drag and drop you image.
                  </p>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="member_name"
                      className="block text-sm font-medium text-white"
                    >
                      Member Name
                    </label>
                    <input
                      type="text"
                      name="member_name"
                      id="member_name"
                      required
                      autoComplete="member_name"
                      onChange={formik.handleChange}
                      value={formik.values.member_name}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-white"
                    >
                      Website
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="bg-gray-60 inline-flex items-center rounded-l-md border border-r-0 border-gray-200 bg-gray-600 px-3 text-sm text-gray-200">
                        http://
                      </span>
                      <input
                        type="text"
                        name="website"
                        id="website"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.website}
                        className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 bg-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="www.example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-white"
                  >
                    Position
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="position"
                      id="position"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.position}
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Position at the team.
                  </p>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="github_username"
                      className="block text-sm font-medium text-white"
                    >
                      Github Username
                    </label>
                    <input
                      type="text"
                      name="github_username"
                      id="github_username"
                      autoComplete="given-name"
                      onChange={formik.handleChange}
                      value={formik.values.github_username}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="linkedln_username"
                      className="block text-sm font-medium text-white"
                    >
                      Linkedln Username
                    </label>
                    <input
                      type="text"
                      name="linkedln_username"
                      id="linkedln_username"
                      autoComplete="given-name"
                      onChange={formik.handleChange}
                      value={formik.values.linkedln_username}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-600 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <LoadingButton loading={loading} buttonText={"Save"} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-600" />
        </div>
      </div>
    </>
  );
};
