import { useFormik } from "formik";
import { LoadingButton } from "ui";

export const NewTeamForm: React.FC<IAddEditTeam> = ({
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
          {header ? header : "New Team"}
        </h3>
        <div className="mt-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-gray-700 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="team_name"
                      className="block text-sm font-medium text-white"
                    >
                      Team Name
                    </label>
                    <input
                      type="text"
                      name="team_name"
                      id="team_name"
                      onChange={formik.handleChange}
                      value={formik.values.team_name}
                      autoComplete="given-name"
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
                    htmlFor="description"
                    className="block text-sm font-medium text-white"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Brief description for your team. URLs are hyperlinked.
                  </p>
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
