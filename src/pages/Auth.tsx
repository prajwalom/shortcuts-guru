import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Keyboard, Sparkles } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Keyboard className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Shortcut Guru
            </h1>
          </div>
          <p className="text-muted-foreground">
            Join the ultimate keyboard shortcuts platform
          </p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Welcome
            </CardTitle>
            <CardDescription>
              Sign in to save your favorite shortcuts and get personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'hsl(217 91% 60%)',
                      brandAccent: 'hsl(270 95% 75%)',
                      brandButtonText: 'hsl(240 10% 3.9%)',
                      defaultButtonBackground: 'hsl(240 4% 16%)',
                      defaultButtonBackgroundHover: 'hsl(240 4% 20%)',
                      defaultButtonBorder: 'hsl(240 4% 16%)',
                      defaultButtonText: 'hsl(0 0% 98%)',
                      dividerBackground: 'hsl(240 4% 16%)',
                      inputBackground: 'hsl(240 4% 16%)',
                      inputBorder: 'hsl(240 4% 16%)',
                      inputBorderHover: 'hsl(217 91% 60%)',
                      inputBorderFocus: 'hsl(217 91% 60%)',
                      inputText: 'hsl(0 0% 98%)',
                      inputLabelText: 'hsl(0 0% 98%)',
                      inputPlaceholder: 'hsl(240 5% 64.9%)',
                      messageText: 'hsl(0 0% 98%)',
                      messageTextDanger: 'hsl(0 84.2% 60.2%)',
                      anchorTextColor: 'hsl(217 91% 60%)',
                      anchorTextHoverColor: 'hsl(270 95% 75%)',
                    },
                    space: {
                      spaceSmall: '4px',
                      spaceMedium: '8px',
                      spaceLarge: '16px',
                      labelBottomMargin: '8px',
                      anchorBottomMargin: '4px',
                      emailInputSpacing: '4px',
                      socialAuthSpacing: '4px',
                      buttonPadding: '10px 15px',
                      inputPadding: '10px 15px',
                    },
                    fontSizes: {
                      baseBodySize: '14px',
                      baseInputSize: '14px',
                      baseLabelSize: '14px',
                      baseButtonSize: '14px',
                    },
                    fonts: {
                      bodyFontFamily: `'Inter', sans-serif`,
                      buttonFontFamily: `'Inter', sans-serif`,
                      inputFontFamily: `'Inter', sans-serif`,
                      labelFontFamily: `'Inter', sans-serif`,
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '6px',
                      buttonBorderRadius: '6px',
                      inputBorderRadius: '6px',
                    },
                  },
                },
              }}
              providers={[]}
              redirectTo={`${window.location.origin}/`}
            />
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            By signing up, you agree to our terms of service and privacy policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;