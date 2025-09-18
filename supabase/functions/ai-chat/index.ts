import "https://deno.land/x/xhr@0.1.0/mod.ts";
// @ts-ignore - Deno runtime module
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

// @ts-ignore - Deno global
const groqApiKey = Deno.env.get('GROQ_API_KEY');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        if (!groqApiKey) {
            console.error('GROQ_API_KEY is not set');
            return new Response(
                JSON.stringify({ error: 'AI service not configured' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const { message } = await req.json();

        if (!message) {
            return new Response(
                JSON.stringify({ error: 'Message is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        console.log('Processing AI chat request for message:', message);

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${groqApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'system',
                        content: `You are a helpful assistant specialized in keyboard shortcuts for various operating systems and applications. 
            You help users find keyboard shortcuts for Mac, Windows, Linux, VS Code, Figma, Chrome, and other popular applications.
            Always provide clear, concise answers about keyboard shortcuts. If a user asks about a specific shortcut, provide the exact key combination.
            Format shortcuts using standard notation (Cmd+C for Mac, Ctrl+C for Windows/Linux).
            Be friendly and helpful, and suggest related shortcuts when relevant.`
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 512,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            console.error('Groq API error:', response.status, await response.text());
            return new Response(
                JSON.stringify({ error: 'AI service temporarily unavailable' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

        console.log('AI response generated successfully');

        return new Response(JSON.stringify({ response: aiResponse }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in ai-chat function:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});