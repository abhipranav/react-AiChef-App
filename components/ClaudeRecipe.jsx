import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ClaudeRecipe({recipe}) {
    return (
        <section className="suggested-recipe-container">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>            
                {recipe}            
            </ReactMarkdown>
        </section>
    )
}



