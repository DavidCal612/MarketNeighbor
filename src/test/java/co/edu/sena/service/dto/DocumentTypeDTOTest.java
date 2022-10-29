package co.edu.sena.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DocumentTypeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentTypeDTO.class);
        DocumentTypeDTO documentTypeDTO1 = new DocumentTypeDTO();
        documentTypeDTO1.setId(1L);
        DocumentTypeDTO documentTypeDTO2 = new DocumentTypeDTO();
        assertThat(documentTypeDTO1).isNotEqualTo(documentTypeDTO2);
        documentTypeDTO2.setId(documentTypeDTO1.getId());
        assertThat(documentTypeDTO1).isEqualTo(documentTypeDTO2);
        documentTypeDTO2.setId(2L);
        assertThat(documentTypeDTO1).isNotEqualTo(documentTypeDTO2);
        documentTypeDTO1.setId(null);
        assertThat(documentTypeDTO1).isNotEqualTo(documentTypeDTO2);
    }
}
