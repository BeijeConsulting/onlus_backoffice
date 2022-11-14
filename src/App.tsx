import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import roles from "./utils/roles";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/ducks/userDuck";
import { useSelector } from "react-redux/es/exports";

//Pages
import PAGES from "./router/pages";
import EntryApp from "./pages/entryApp/EntryApp";
import General from "./pages/editor/general/General";
import Home from "./pages/editor/home/Home";
import Login from "./pages/login/Login";
import PersonalArea from "./pages/personalArea/PersonalArea";
import About from "./pages/editor/about/About";
import SupportUs from "./pages/editor/supportUs/SupportUs";
import Faq from "./pages/editor/faq/Faq";
import Social from "./pages/editor/social/Social";
import EditorFaq from "./pages/editor/faq/EditorFaq";
import EditorSocial from "./pages/editor/social/EditorSocial";
import Events from "./pages/events/Events";
import EditorEvents from "./pages/events/EditorEvents";
import Blog from "./pages/articles/blog/Blog";
import EditorBlog from "./pages/articles/blog/EditorBlog";
import Categories from "./pages/articles/categories/Categories";
import Collaborators from "./pages/users/collaborators/Collaborators";
import EditorCollaborators from "./pages/users/collaborators/EditorCollaborators";
import Volunteers from "./pages/users/volunteers/Volunteers";
import EditVolunteers from "./pages/users/volunteers/EditVolunteers";
import Donations from "./pages/donations/Donations";
import NotFound from "./pages/notFound/NotFound";
import { useCookies } from "react-cookie";

//Mui
import { StyledEngineProvider } from "@mui/material";

//**TO DO**//
// -aggiungere loader
// -aggiungere fallback se il server non risponde in maniera corretta

function App() {
  //redux and auth
  //const dispatch: Dispatch<AnyAction> = useDispatch(); ==> non funziona ):
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const dispatch: any = useDispatch();
  const sendUser = cookies?.user?.data;

  useEffect(() => {
    dispatch(setUser({ user: sendUser }));
  }, [sendUser]);

  let user = useSelector((state: any) => state.userDuck.user);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <Routes>
          <Route path={PAGES.login} element={<Login />} />
          {!!user?.permission && (
            <>
              <Route path={PAGES.entryApp} element={<EntryApp />}>
                <Route path={PAGES.personalArea} element={<PersonalArea />} />
                {user?.permission?.includes(roles.admin) && (
                  <>
                    <Route path={PAGES.editGeneral} element={<General />} />
                    <Route path={PAGES.editHome} element={<Home />} />
                    <Route path={PAGES.editAbout} element={<About />} />
                    <Route path={PAGES.editSupportUs} element={<SupportUs />} />
                    <Route path={PAGES.editFaq} element={<Faq />} />
                    <Route path={PAGES.editorFaq} element={<EditorFaq />} />
                    <Route path={PAGES.editSocial} element={<Social />} />
                    <Route
                      path={PAGES.editorSocial}
                      element={<EditorSocial />}
                    />
                    <Route path={PAGES.events} element={<Events />} />
                    <Route
                      path={PAGES.editorEvents}
                      element={<EditorEvents />}
                    />
                    <Route
                      path={PAGES.usersCollaborators}
                      element={<Collaborators />}
                    />
                    <Route
                      path={PAGES.editorCollaborators}
                      element={<EditorCollaborators />}
                    />
                    <Route
                      path={PAGES.usersVolunteers}
                      element={<Volunteers />}
                    />
                    <Route
                      path={PAGES.editorVolunteers}
                      element={<EditVolunteers />}
                    />

                    <Route path={PAGES.donations} element={<Donations />} />
                  </>
                )}
                <Route path={PAGES.articlesBlog} element={<Blog />} />
                <Route path={PAGES.editorBlog} element={<EditorBlog />} />
                <Route
                  path={PAGES.articlesCategories}
                  element={<Categories />}
                />
              </Route>
              <Route path={"*"} element={<NotFound />} />
            </>
          )}
        </Routes>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
