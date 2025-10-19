### *Design of Artificial Intelligence in Legal Technologies*

>

Despite generative AI being associated with erroneous case filings, and initial concerns regarding confidentiality and accuracy,
law firms and legal technologies continue to integrate AI into their workflows. Learn how I, as a developer who learned 
to use standard legal software through a paralegal certification program, differentiate between instances where AI is being used for professional
work responsibly and irresponsibly, how I recognized hallucinations in early AI tools by becoming a content expert on specific case law,
and how AI tools used for their designed purpose are becoming instrumental to law firms.

> *Disclaimer: As someone seeking candidacy in law school, I understand the concern of usage of AI in higher education. 
However, I do see the value in addressing these concerning tools, even if it means drawing attention to my experience with them. 
I anticipate my career being centered around the implications of technology on law, and vice versa, so I hope by sharing 
my experience I can provide insight as such without seemingly advocating for the use of AI in dishonest ways. If anything, I hope to 
show what people need to be aware of in a world where these tools are becoming increasingly prevalent.*

---

> In 2023, after receiving my Masters' in Electrical and Computer Engineering in 2022, and while working at Dell Technologies as 
a full-time software engineer, I enrolled in a Paralegal Certification program at Boston University, 
as part of my long-term goal of becoming an attorney with a background in technology. The 14-week program focused on
legal research, writing, substantive law, and an exploration of legal technology used in law firms and courts,
such as Lexus Nexus, Westlaw, and PACER.

> Around the time I was enrolled in the program, generative AI tools such as [ChatGPT](https://openai.com/blog/chatgpt/) were becoming increasingly popular,
and a topic we explored in class was how they were impacting the legal field. Specifically, we discussed the risks of
[lawyers using AI such as ChatGPT for court documents](https://www.forbes.com/sites/mollybohannon/2023/06/08/lawyer-used-chatgpt-in-court-and-cited-fake-cases-a-judge-is-considering-sanctions/). 
Having taken courses in machine learning and natural language processing during my undergraduate and graduate studies, 
the concept of large language models (LLMs) was not new to me. What was surprising was that there was now a commercially 
available tool that could generate humanlike text, and it was being used in situations where a human factor is essential,
such as in court filings.

> During the tort law section of the course, I became overtly familiar with strict liability dog bite laws in Massachusetts,
and the relevant case law. Given our discussion on ChatGPT, and as part of an assignment to explore its impact on law,
I generated a case briefing for one of the cases we discussed in class.
Upon requesting a case briefing for a specific case using GPT-3, I found
that **cross referencing the citations provided by ChatGPT with Lexus Nexus and Westlaw revealed that they were entirely 
fabricated**. This phenomenon, known as AI hallucination, is a significant concern in the legal field, where accuracy and reliability are paramount.
Despite the fictional citations, the briefing was altogether reasonable in its depiction of the issue, given what information I provided it. It was
only because I was familiar with the case law and validated the citations through trusted sources that I caught its mistake.

> *Note: If you are curious how my ChatBot would fair with a similar task, try it! [I have programmed it to avoid claiming 
it has the capability of providing accurate legal information](https://arxiv.org/pdf/2404.13208), since its purpose is to be a subject-matter expert on another 
topic: me!*

> Now, in 2025, those same trusted sources for legal research have incorporated AI features, such as 
[Westlaw Precision with CoCounsel](https://legal.thomsonreuters.com/en/c/westlaw/westlaw-precision-generative-ai?searchid=TRPPCSOL/Google/LegalUS_RS_Westlaw_Main_Search_Brand-All_US/AI&chl=ppc&cid=4989046&sfdccampaignid=701PA00000HnC4jYAF&ef_id=CjwKCAjw1dLDBhBoEiwAQNRiQd1W1-Ia4aYAvEyBdxG14a8bO127Ad4q1bh47vdMW04tBKloflLddhoCWhgQAvD_BwE:G:s&s_kwcid=AL!7944!3!681703130762!e!!g!!westlaw%20ai&gad_source=1&gad_campaignid=1680175562&gclid=CjwKCAjw1dLDBhBoEiwAQNRiQd1W1-Ia4aYAvEyBdxG14a8bO127Ad4q1bh47vdMW04tBKloflLddhoCWhgQAvD_BwE)
and [Lexis+ AI](https://www.lexisnexis.com/en-us/products/lexis-plus-ai.page), and a recent study of 
[how AI could shape the future of large law firms](https://clp.law.harvard.edu/knowledge-hub/insights/the-impact-of-artificial-intelligence-on-law-law-firms-business-models/)
has shown that the "quantum leap" in productivity from AI is causing some firms to reassess the viability of the billable hour business model. 
Given the original inaccuracy of generative AI for legal matters, what has changed in the past few years that has drastically changed notion of AI usage in professional settings?

> First is to address what can be qualified as an "AI tool". Machine learning is the method used to create statistical models 
using large datasets of labelled information. These statistical models are then used to classify similar information that
contains no label based on the training they have been given, such as with image recognition models.
While most people are familiar with [CAPTCHA's](https://en.wikipedia.org/wiki/CAPTCHA) as ways of 
distinguishing human users from robots, most people aren't ware that [by completing CAPTCHA's, you are contributing to a 
database of labelled information that is used to train image recognition models](https://www.technologyreview.com/2023/10/24/1081139/captchas-ai-websites-computing/). Essentially, by selecting the "bus" or
"street lights" in a photo to prove that you are human, you are improving the accuracy of models that can train thanks
to the label you have contributed.

> Large language models (LLMs) are no different from these models, with one key distinction. Instead of identifying images,
they identify the most likely next word in a sentence,
and instead of training on labelled images, they can just use enormous corpora of text. Their purpose is to use the given words
to determine what follows, meaning that, unlike image based models, their input is the same form as their output: text is what it consumes,
and text is what it produces. Thanks to the internet, developers of LLMs have access to a virtually endless dataset for training text based models.

> AI tools are, therefore, any software that incorporates one of these statistical models. As a consequence, this software is
only as trustworthy as the models themselves. Several methods exist in increasing the accuracy of these models. Increasing the amount of training data
typically increases the accuracy in machine learning models, however diminishing returns typically occur at some point. Fine-tuning a model
(curating domain specific information or desired interactions to refine its output, and re-training from a checkpoint)
can improve accuracy for specific instances, but decreases the desired general applicability for tools such as chatbots.

> The greatest increase in accuracy of AI tools, in my opinion, is attributable to [agentic design](https://lilianweng.github.io/posts/2023-06-23-agent/), a concept that has drawn upon human
cognition as its inspiration. The problem of AI hallucinations arises in instances where the most probabilistic response is
initially inaccurate given the context. Given additional, *accurate* information, accuracy increases, and AI hallucinations diminish.
The process by which software can build for AI additional context by first retrieving trustworthy information before initiating a response is similar to the
modes of thought described by Daniel Kahneman in *Thinking, Fast and Slow*.

> Daniel Kahneman describes two different ways the brain forms thoughts:

- System 1: Fast, automatic, frequent, emotional, stereotypic, unconscious.
- System 2: Slow, effortful, infrequent, logical, calculating, conscious.

> The immediate output of an LLM is comparable to System 1 in that it is heuristic based. AI tools can take advantage of System 2
by deliberately preceding any generative efforts with additional information. [Chain-of-thought](https://arxiv.org/pdf/2201.11903)
is a method that instructs the LLM to build that context for itself, and is demonstrable in increasingly popular reasoning models. 
By preventing initial heuristic based responses, the LLM is forced to go step-by-step towards its conclusion, narrowing
its responses towards one that has carefully considered alternatives.

> Another technique in agentic design is [retrieval-augmented generation](https://arxiv.org/pdf/2312.10997). Suppose you asked a chatbot what day it was. Given that it was trained on the internet as a corpus, it might claim that
today is Christmas (since December 25th is one of the most commonly listed dates on the internet, and is therefore a 
good guess based on its training data). If it has been instructed, it might claim it doesn't have that information. An **AI agent**, however, uses RAG to invoke another
tool that *can* determine what the date is, and it uses that information in its response. The process of the invocation
and the information provided by the separate tool are hidden from the user, making the experience relatively unchanged.

> How does this impact legal technologies? What if instead of retrieving the date, the software performs a search on
relevant case law for the subject of your prompt, and inserts the entire text of that case into your prompt? 
For tools such as Lexus Nexus and Westlaw, databases containing this information are already readily available. These platforms 
also feature tools for developers, allowing anyone to retrieve accurate information to incorporate into their own AI using APIs.

> These methods draw a sharp contrast between modern AI tools and earlier usages of LLMs, where one would do something as irresponsible as,
say, copy-and-pasting information from a chatbot for a court filing. Instead, the previously mentioned [Westlaw Precision with CoCounsel](https://legal.thomsonreuters.com/en/c/westlaw/westlaw-precision-generative-ai?searchid=TRPPCSOL/Google/LegalUS_RS_Westlaw_Main_Search_Brand-All_US/AI&chl=ppc&cid=4989046&sfdccampaignid=701PA00000HnC4jYAF&ef_id=CjwKCAjw1dLDBhBoEiwAQNRiQd1W1-Ia4aYAvEyBdxG14a8bO127Ad4q1bh47vdMW04tBKloflLddhoCWhgQAvD_BwE:G:s&s_kwcid=AL!7944!3!681703130762!e!!g!!westlaw%20ai&gad_source=1&gad_campaignid=1680175562&gclid=CjwKCAjw1dLDBhBoEiwAQNRiQd1W1-Ia4aYAvEyBdxG14a8bO127Ad4q1bh47vdMW04tBKloflLddhoCWhgQAvD_BwE)
and [Lexis+ AI](https://www.lexisnexis.com/en-us/products/lexis-plus-ai.page) both leverage their existing access to accurate
information as a way of increasing the accuracy of AI features by performing relevant searches at the moment of inquiry.
Not only are these methods incorporated into legal research, but they also aid in case management, allowing your own
notes, emails, and communications to be used for generating responses.

> Given this reframing of how LLMs contribute to AI tools overall, and the following increase in reliability,
it's unsurprising to see their widespread adoption by firms. The scope of their capabilities has steadily and drastically increased,
and developers are accordingly eager to create AI tools for the benefit of legal professionals, provided they
use techniques that prioritize the utilization of trustworthy legal databases.